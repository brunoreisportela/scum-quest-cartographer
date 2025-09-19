const fs = require('fs');
const path = require('path');

// Helper function to determine quest difficulty based on tier
const getDifficultyFromTier = (tier) => {
  switch (tier) {
    case 1: return 'Easy';
    case 2: return 'Medium';
    case 3: return 'Hard';
    case 4:
    case 5: return 'Extreme';
    default: return 'Medium';
  }
};

// Helper function to extract requirements from conditions
const extractRequirements = (rawData) => {
  const requirements = [];
  
  rawData.Conditions.forEach(condition => {
    if (condition.Type === 'Fetch' && condition.RequiredItems) {
      condition.RequiredItems.forEach(reqItem => {
        const itemNames = reqItem.AcceptedItems.map(item => 
          item.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
        );
        requirements.push(`${reqItem.RequiredNum}x ${itemNames[0]}${itemNames.length > 1 ? ' (or alternatives)' : ''}`);
      });
    } else if (condition.Type === 'Interaction' && condition.Locations) {
      requirements.push(condition.TrackingCaption);
    }
  });
  
  return requirements;
};

// Helper function to extract rewards from reward pool
const extractRewards = (rawData) => {
  const rewards = [];
  
  rawData.RewardPool.forEach(pool => {
    if (pool.CurrencyNormal) {
      rewards.push(`${pool.CurrencyNormal} Credits`);
    }
    if (pool.Fame) {
      rewards.push(`${pool.Fame} Fame`);
    }
    if (pool.TradeDeals) {
      pool.TradeDeals.forEach(deal => {
        const itemName = deal.Item.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        rewards.push(`${deal.Amount}x ${itemName} (${deal.Price} Credits each)`);
      });
    }
    if (pool.Skills) {
      pool.Skills.forEach(skill => {
        rewards.push(`${skill.Experience} ${skill.Skill} XP`);
      });
    }
  });
  
  return rewards;
};

// Helper function to determine quest type
const getQuestType = (rawData) => {
  const types = rawData.Conditions.map(c => c.Type);
  const uniqueTypes = [...new Set(types)];
  
  if (uniqueTypes.length === 1) {
    return uniqueTypes[0];
  }
  return 'Mixed';
};

// Transform raw quest data to Quest interface
const transformRawQuest = (rawData, filename) => {
  const id = filename.replace('.json', '');
  
  return {
    id,
    name: rawData.Title,
    description: rawData.Description,
    status: 'available',
    tier: Math.min(Math.max(rawData.Tier, 1), 5),
    npc: rawData.AssociatedNpc,
    timeLimitHours: rawData.TimeLimitHours,
    requirements: extractRequirements(rawData),
    rewards: extractRewards(rawData),
    difficulty: getDifficultyFromTier(rawData.Tier),
    questType: getQuestType(rawData),
    rawData
  };
};

// Process all quest files
async function processQuests() {
  const questsDir = path.join(__dirname, '../quests');
  const outputFile = path.join(__dirname, '../src/data/processedQuests.json');
  
  if (!fs.existsSync(questsDir)) {
    console.error('Quests directory not found:', questsDir);
    return;
  }

  // Define category mappings
  const categoryMappings = [
    {
      id: 'armory',
      name: 'Armory',
      description: 'Weapon and armor related quests from the Armorer',
      icon: '🏹',
      directories: ['Armory Fetch']
    },
    {
      id: 'banking',
      name: 'Banking',
      description: 'Financial and trading quests from the Banker',
      icon: '💰',
      directories: ['Banker Fetch']
    },
    {
      id: 'hospitality',
      name: 'Hospitality',
      description: 'Food, drinks, and entertainment quests from the Bartender',
      icon: '🍺',
      directories: ['Bartender Fetch']
    },
    {
      id: 'medical',
      name: 'Medical',
      description: 'Health and medical supply quests from the Doctor',
      icon: '⚕️',
      directories: ['Doctor Fetch']
    },
    {
      id: 'general',
      name: 'General Goods',
      description: 'General trading and crafting quests',
      icon: '📦',
      directories: ['General Goods Fetch', 'General Goods Interations']
    },
    {
      id: 'harbor',
      name: 'Harbor',
      description: 'Maritime and fishing related quests',
      icon: '⚓',
      directories: ['Harbor Fetch', 'Harbor Interaction']
    },
    {
      id: 'mechanic',
      name: 'Mechanic',
      description: 'Vehicle maintenance and repair quests',
      icon: '🔧',
      directories: ['Mechanic Car Quests', 'Mechanic Fetch', 'Mechanic Interaction']
    }
  ];

  const categories = [];

  for (const categoryMapping of categoryMappings) {
    const questTypes = [];

    for (const directory of categoryMapping.directories) {
      const dirPath = path.join(questsDir, directory);
      
      if (!fs.existsSync(dirPath)) {
        console.warn(`Directory not found: ${directory}`);
        continue;
      }

      const questType = {
        id: directory.toLowerCase().replace(/\s+/g, '-'),
        name: directory,
        description: `Quests from ${directory}`,
        quests: []
      };

      const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.json'));
      
      for (const file of files) {
        try {
          const filePath = path.join(dirPath, file);
          const rawData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          const quest = transformRawQuest(rawData, file);
          questType.quests.push(quest);
        } catch (error) {
          console.error(`Error processing ${file}:`, error.message);
        }
      }

      if (questType.quests.length > 0) {
        questTypes.push(questType);
      }
    }

    if (questTypes.length > 0) {
      categories.push({
        id: categoryMapping.id,
        name: categoryMapping.name,
        description: categoryMapping.description,
        icon: categoryMapping.icon,
        types: questTypes
      });
    }
  }

  // Write the processed data
  fs.writeFileSync(outputFile, JSON.stringify(categories, null, 2));
  console.log(`Processed ${categories.reduce((total, cat) => total + cat.types.reduce((typeTotal, type) => typeTotal + type.quests.length, 0), 0)} quests into ${categories.length} categories`);
  console.log(`Output written to: ${outputFile}`);
}

// Run the processing
processQuests().catch(console.error);


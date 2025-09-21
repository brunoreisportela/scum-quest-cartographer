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

// Helper function to determine category info based on folder name
const getCategoryInfo = (folderName) => {
  const lowerName = folderName.toLowerCase();
  
  // Define category mappings based on folder name patterns
  if (lowerName.includes('armory') || lowerName.includes('armor')) {
    return {
      id: 'armory',
      name: 'Armory',
      description: 'Weapon and armor related quests',
      icon: '🏹'
    };
  } else if (lowerName.includes('bank')) {
    return {
      id: 'banking',
      name: 'Banking',
      description: 'Financial and trading quests',
      icon: '💰'
    };
  } else if (lowerName.includes('bartender') || lowerName.includes('bar')) {
    return {
      id: 'hospitality',
      name: 'Hospitality',
      description: 'Food, drinks, and entertainment quests',
      icon: '🍺'
    };
  } else if (lowerName.includes('doctor') || lowerName.includes('medical')) {
    return {
      id: 'medical',
      name: 'Medical',
      description: 'Health and medical supply quests',
      icon: '⚕️'
    };
  } else if (lowerName.includes('general') || lowerName.includes('goods')) {
    return {
      id: 'general',
      name: 'General Goods',
      description: 'General trading and crafting quests',
      icon: '📦'
    };
  } else if (lowerName.includes('harbor') || lowerName.includes('fishing')) {
    return {
      id: 'harbor',
      name: 'Harbor',
      description: 'Maritime and fishing related quests',
      icon: '⚓'
    };
  } else if (lowerName.includes('mechanic') || lowerName.includes('vehicle') || lowerName.includes('car')) {
    return {
      id: 'mechanic',
      name: 'Mechanic',
      description: 'Vehicle maintenance and repair quests',
      icon: '🔧'
    };
  } else {
    // Default category for unknown folders
    return {
      id: folderName.toLowerCase().replace(/\s+/g, '-'),
      name: folderName,
      description: `Quests from ${folderName}`,
      icon: '❓'
    };
  }
};

// Process all quest files
async function processQuests() {
  const questsDir = path.join(__dirname, '../quests');
  const outputFile = path.join(__dirname, '../src/data/processedQuests.json');
  
  if (!fs.existsSync(questsDir)) {
    console.error('Quests directory not found:', questsDir);
    return;
  }

  console.log('Scanning quest directories...');
  
  // Get all directories in the quests folder
  const allDirectories = fs.readdirSync(questsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  console.log(`Found ${allDirectories.length} quest directories:`, allDirectories);

  // Group directories by category
  const categoryMap = new Map();

  for (const directory of allDirectories) {
    const categoryInfo = getCategoryInfo(directory);
    
    if (!categoryMap.has(categoryInfo.id)) {
      categoryMap.set(categoryInfo.id, {
        ...categoryInfo,
        directories: []
      });
    }
    
    categoryMap.get(categoryInfo.id).directories.push(directory);
  }

  const categories = [];

  // Process each category
  for (const [categoryId, categoryData] of categoryMap) {
    const questTypes = [];

    for (const directory of categoryData.directories) {
      const dirPath = path.join(questsDir, directory);
      
      console.log(`Processing directory: ${directory}`);

      const questType = {
        id: directory.toLowerCase().replace(/\s+/g, '-'),
        name: directory,
        description: `Quests from ${directory}`,
        quests: []
      };

      const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.json'));
      console.log(`  Found ${files.length} quest files`);
      
      for (const file of files) {
        try {
          const filePath = path.join(dirPath, file);
          const rawData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          const quest = transformRawQuest(rawData, file);
          questType.quests.push(quest);
        } catch (error) {
          console.error(`  Error processing ${file}:`, error.message);
        }
      }

      if (questType.quests.length > 0) {
        questTypes.push(questType);
        console.log(`  Successfully processed ${questType.quests.length} quests`);
      }
    }

    if (questTypes.length > 0) {
      categories.push({
        id: categoryData.id,
        name: categoryData.name,
        description: categoryData.description,
        icon: categoryData.icon,
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


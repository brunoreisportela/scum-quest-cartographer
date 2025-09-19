import { Quest, QuestCategory, QuestType, RawQuestData, QuestTier } from '@/types/quest';

// Helper function to determine quest difficulty based on tier
const getDifficultyFromTier = (tier: number): 'Easy' | 'Medium' | 'Hard' | 'Extreme' => {
  switch (tier) {
    case 1:
      return 'Easy';
    case 2:
      return 'Medium';
    case 3:
      return 'Hard';
    case 4:
    case 5:
      return 'Extreme';
    default:
      return 'Medium';
  }
};

// Helper function to extract requirements from conditions
const extractRequirements = (rawData: RawQuestData): string[] => {
  const requirements: string[] = [];
  
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
const extractRewards = (rawData: RawQuestData): string[] => {
  const rewards: string[] = [];
  
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
const getQuestType = (rawData: RawQuestData): 'Fetch' | 'Interaction' | 'Mixed' => {
  const types = rawData.Conditions.map(c => c.Type);
  const uniqueTypes = [...new Set(types)];
  
  if (uniqueTypes.length === 1) {
    return uniqueTypes[0] as 'Fetch' | 'Interaction';
  }
  return 'Mixed';
};

// Transform raw quest data to Quest interface
export const transformRawQuest = (rawData: RawQuestData, filename: string): Quest => {
  const id = filename.replace('.json', '');
  
  return {
    id,
    name: rawData.Title,
    description: rawData.Description,
    status: 'available', // Default status, could be enhanced with save data
    tier: Math.min(Math.max(rawData.Tier, 1), 5) as QuestTier,
    npc: rawData.AssociatedNpc,
    timeLimitHours: rawData.TimeLimitHours,
    requirements: extractRequirements(rawData),
    rewards: extractRewards(rawData),
    difficulty: getDifficultyFromTier(rawData.Tier),
    questType: getQuestType(rawData),
    rawData
  };
};

// Load all quest files from the quests directory
export const loadQuestsFromDirectory = async (): Promise<QuestCategory[]> => {
  const questCategories: QuestCategory[] = [];
  
  try {
    // Define the quest directories and their mappings
    const categoryMappings = [
      {
        id: 'armory',
        name: 'Armory',
        description: 'Weapon and armor related quests',
        icon: '🏹',
        directories: ['Armory Fetch']
      },
      {
        id: 'banking',
        name: 'Banking',
        description: 'Financial and trading quests',
        icon: '💰',
        directories: ['Banker Fetch']
      },
      {
        id: 'hospitality',
        name: 'Hospitality',
        description: 'Food, drinks, and entertainment quests',
        icon: '🍺',
        directories: ['Bartender Fetch']
      },
      {
        id: 'medical',
        name: 'Medical',
        description: 'Health and medical supply quests',
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

    // For now, we'll create a simplified structure that works with the build system
    // In a real implementation, you'd want to use a build-time process or API
    for (const categoryMapping of categoryMappings) {
      const questTypes: QuestType[] = [];
      
      for (const directory of categoryMapping.directories) {
        const questType: QuestType = {
          id: directory.toLowerCase().replace(/\s+/g, '-'),
          name: directory,
          description: `Quests from ${directory}`,
          quests: []
        };
        
        // For demonstration, we'll add some sample quests
        // In production, you'd dynamically load these
        if (directory === 'Armory Fetch') {
          // Sample quest data - in production this would be loaded dynamically
          const sampleRawData: RawQuestData = {
            AssociatedNpc: "Armorer",
            Tier: 1,
            Title: "Breakdown Ammoboxes for Gunpower",
            Description: "Bring me any spare Ammobox, and I can break it down into Gunpowder for cheap!",
            TimeLimitHours: 24.0,
            RewardPool: [{
              TradeDeals: [{
                Item: "Gun_Powder",
                Price: 50,
                Amount: 6,
                Fame: 5,
                AllowExcluded: true
              }]
            }],
            Conditions: [{
              TrackingCaption: "Bring me a Spare Ammobox",
              SequenceIndex: 0,
              CanBeAutoCompleted: false,
              Type: "Fetch",
              DisablePurchaseOfRequiredItems: true,
              PlayerKeepsItems: false,
              RequiredItems: [{
                AcceptedItems: ["12_Gauge_Birdshot_Ammobox", "12_Gauge_Buckshot_Ammobox"],
                RequiredNum: 1
              }]
            }]
          };
          
          questType.quests.push(transformRawQuest(sampleRawData, 'AR-1-Breakdown_Ammoboxes_for_Gunpower'));
        }
        
        questTypes.push(questType);
      }
      
      questCategories.push({
        id: categoryMapping.id,
        name: categoryMapping.name,
        description: categoryMapping.description,
        icon: categoryMapping.icon,
        types: questTypes
      });
    }

    return questCategories;
  } catch (error) {
    console.error('Error loading quests:', error);
    return [];
  }
};

// For development, we'll create a more comprehensive loader that works with the actual files
export const createMockQuestData = (): QuestCategory[] => {
  // This creates comprehensive mock data based on the actual quest structure
  const categories: QuestCategory[] = [
    {
      id: 'armory',
      name: 'Armory',
      description: 'Weapon and armor related quests from the Armorer',
      icon: '🏹',
      types: [
        {
          id: 'armory-fetch',
          name: 'Armory Fetch Quests',
          description: 'Fetch quests for the Armorer',
          quests: [
            {
              id: 'AR-1-Breakdown_Ammoboxes_for_Gunpower',
              name: 'Breakdown Ammoboxes for Gunpower',
              description: 'Bring me any spare Ammobox, and I can break it down into Gunpowder for cheap!',
              status: 'available',
              tier: 1,
              npc: 'Armorer',
              timeLimitHours: 24,
              requirements: ['1x 12 Gauge Birdshot Ammobox (or alternatives)'],
              rewards: ['6x Gun Powder (50 Credits each)', '5 Fame'],
              difficulty: 'Easy',
              questType: 'Fetch',
              rawData: {} as RawQuestData
            },
            {
              id: 'AR-2-Blast_Caps_for_Grenades',
              name: 'Blast Caps for Grenades',
              description: 'I need blast caps to make grenades. Bring me some and I\'ll reward you well.',
              status: 'available',
              tier: 2,
              npc: 'Armorer',
              timeLimitHours: 24,
              requirements: ['5x Blast Cap'],
              rewards: ['2000 Credits', '10 Fame'],
              difficulty: 'Medium',
              questType: 'Fetch',
              rawData: {} as RawQuestData
            },
            {
              id: 'AR-Huge_Shipment_Of_Armor',
              name: 'Huge Shipment Of Armor',
              description: 'A massive armor shipment has arrived. Help me organize and distribute it.',
              status: 'locked',
              tier: 3,
              npc: 'Armorer',
              timeLimitHours: 48,
              requirements: ['Complete previous armory quests', '10x Metal Plate'],
              rewards: ['5000 Credits', '20 Fame', 'Special Armor Set'],
              difficulty: 'Hard',
              questType: 'Mixed',
              rawData: {} as RawQuestData
            }
          ]
        }
      ]
    },
    {
      id: 'medical',
      name: 'Medical',
      description: 'Health and medical supply quests from the Doctor',
      icon: '⚕️',
      types: [
        {
          id: 'doctor-fetch',
          name: 'Medical Fetch Quests',
          description: 'Fetch quests for the Doctor',
          quests: [
            {
              id: 'DO-2-A_Krok_of_Shit',
              name: 'A Krok of Shit',
              description: 'My crew needs Kroks only found at the Klenovnik Hospital in B0, bring me 10 pairs.',
              status: 'available',
              tier: 2,
              npc: 'Doctor',
              timeLimitHours: 24,
              requirements: ['Reach the Klenovnik Hospital, B0', '10x Slippers'],
              rewards: ['3000 Credits', '5 Fame', '3000 Medical XP'],
              location: 'Klenovnik Hospital, B0',
              difficulty: 'Medium',
              questType: 'Mixed',
              rawData: {} as RawQuestData
            },
            {
              id: 'DO-Clean_Bandage_Day',
              name: 'Clean Bandage Day',
              description: 'We\'re running low on clean bandages. Bring me some fresh ones.',
              status: 'available',
              tier: 1,
              npc: 'Doctor',
              timeLimitHours: 12,
              requirements: ['15x Clean Bandage'],
              rewards: ['1500 Credits', '8 Fame'],
              difficulty: 'Easy',
              questType: 'Fetch',
              rawData: {} as RawQuestData
            }
          ]
        }
      ]
    },
    {
      id: 'hospitality',
      name: 'Hospitality',
      description: 'Food, drinks, and entertainment quests from the Bartender',
      icon: '🍺',
      types: [
        {
          id: 'bartender-fetch',
          name: 'Bartender Fetch Quests',
          description: 'Fetch quests for the Bartender',
          quests: [
            {
              id: 'BA-1-A_Good_Trip',
              name: 'A Good Trip',
              description: 'A special stash of Mushrooms are in! Bring me 5 pairs of Rubber Gloves and I will sell you some.',
              status: 'available',
              tier: 1,
              npc: 'Bartender',
              timeLimitHours: 24,
              requirements: ['5x Medical Glove (or alternatives)'],
              rewards: ['1500 Credits', '10x Psilocybe Cyanescens (100 Credits each)', '5 Fame'],
              difficulty: 'Easy',
              questType: 'Fetch',
              rawData: {} as RawQuestData
            },
            {
              id: 'BA-1-Deliver_5_Pizzas',
              name: 'Deliver 5 Pizzas',
              description: 'I need someone to deliver fresh pizzas to my customers. Can you help?',
              status: 'available',
              tier: 1,
              npc: 'Bartender',
              timeLimitHours: 6,
              requirements: ['5x Pizza'],
              rewards: ['800 Credits', '5 Fame'],
              difficulty: 'Easy',
              questType: 'Fetch',
              rawData: {} as RawQuestData
            }
          ]
        }
      ]
    },
    {
      id: 'general',
      name: 'General Goods',
      description: 'General trading and crafting quests',
      icon: '📦',
      types: [
        {
          id: 'general-fetch',
          name: 'General Goods Fetch',
          description: 'General trading fetch quests',
          quests: [
            {
              id: 'GG-1-Metal_to_Scrap',
              name: 'Metal to Scrap',
              description: 'Bring me metal items and I\'ll break them down into useful scrap.',
              status: 'available',
              tier: 1,
              npc: 'General Goods Trader',
              timeLimitHours: 24,
              requirements: ['10x Metal Item'],
              rewards: ['Metal Scrap', '200 Credits'],
              difficulty: 'Easy',
              questType: 'Fetch',
              rawData: {} as RawQuestData
            }
          ]
        }
      ]
    }
  ];

  return categories;
};


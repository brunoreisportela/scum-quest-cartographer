import { QuestCategory } from '@/types/quest';

export const questCategories: QuestCategory[] = [
  {
    id: 'survival',
    name: 'Survival',
    description: 'Basic survival challenges to test your ability to stay alive',
    icon: '🏕️',
    types: [
      {
        id: 'basic-needs',
        name: 'Basic Needs',
        description: 'Essential survival tasks',
        quests: [
          {
            id: 'first-meal',
            name: 'First Meal',
            description: 'Find and consume your first meal to avoid starvation',
            status: 'available',
            tier: 1,
            requirements: ['Find food source'],
            rewards: ['100 Fame Points', 'Hunger satisfied'],
            location: 'Any location',
            difficulty: 'Easy'
          },
          {
            id: 'water-source',
            name: 'Water Source',
            description: 'Locate and drink from a clean water source',
            status: 'available',
            tier: 1,
            requirements: ['Find water'],
            rewards: ['50 Fame Points', 'Thirst quenched'],
            location: 'Near rivers or wells',
            difficulty: 'Easy'
          },
          {
            id: 'shelter-seeker',
            name: 'Shelter Seeker',
            description: 'Find or build adequate shelter for the night',
            status: 'locked',
            tier: 2,
            requirements: ['Complete First Meal', 'Gather materials'],
            rewards: ['200 Fame Points', 'Shelter blueprints'],
            location: 'Forest areas',
            difficulty: 'Medium'
          }
        ]
      },
      {
        id: 'crafting',
        name: 'Crafting',
        description: 'Learn to create essential tools and items',
        quests: [
          {
            id: 'first-tool',
            name: 'First Tool',
            description: 'Craft your first improvised tool',
            status: 'locked',
            tier: 2,
            requirements: ['Gather basic materials'],
            rewards: ['150 Fame Points', 'Crafting experience'],
            location: 'Crafting area',
            difficulty: 'Medium'
          },
          {
            id: 'weapon-smith',
            name: 'Weapon Smith',
            description: 'Create your first improvised weapon',
            status: 'locked',
            tier: 3,
            requirements: ['Complete First Tool', 'Find metal scraps'],
            rewards: ['300 Fame Points', 'Basic weapon'],
            location: 'Industrial areas',
            difficulty: 'Hard'
          }
        ]
      }
    ]
  },
  {
    id: 'combat',
    name: 'Combat',
    description: 'Prove your fighting skills against puppets and other players',
    icon: '⚔️',
    types: [
      {
        id: 'puppet-hunter',
        name: 'Puppet Hunter',
        description: 'Eliminate various types of puppets',
        quests: [
          {
            id: 'first-kill',
            name: 'First Kill',
            description: 'Eliminate your first puppet',
            status: 'locked',
            tier: 2,
            requirements: ['Have a weapon'],
            rewards: ['200 Fame Points', 'Combat experience'],
            location: 'Any puppet spawn',
            difficulty: 'Medium'
          },
          {
            id: 'puppet-slayer',
            name: 'Puppet Slayer',
            description: 'Eliminate 10 puppets in a single session',
            status: 'locked',
            tier: 4,
            requirements: ['Complete First Kill', 'Advanced weapons'],
            rewards: ['500 Fame Points', 'Special gear'],
            location: 'High-density areas',
            difficulty: 'Extreme'
          }
        ]
      },
      {
        id: 'pvp',
        name: 'PvP Combat',
        description: 'Face other players in deadly combat',
        quests: [
          {
            id: 'first-victory',
            name: 'First Victory',
            description: 'Win your first player vs player encounter',
            status: 'locked',
            tier: 3,
            requirements: ['Combat experience', 'Good equipment'],
            rewards: ['400 Fame Points', 'PvP rank'],
            location: 'PvP zones',
            difficulty: 'Hard'
          }
        ]
      }
    ]
  },
  {
    id: 'exploration',
    name: 'Exploration',
    description: 'Discover the secrets of the island',
    icon: '🗺️',
    types: [
      {
        id: 'landmarks',
        name: 'Landmarks',
        description: 'Visit important locations on the island',
        quests: [
          {
            id: 'first-bunker',
            name: 'First Bunker',
            description: 'Discover and enter your first bunker',
            status: 'locked',
            tier: 3,
            requirements: ['Lockpicking skills', 'Radiation protection'],
            rewards: ['350 Fame Points', 'Rare loot'],
            location: 'Underground bunkers',
            difficulty: 'Hard'
          },
          {
            id: 'island-cartographer',
            name: 'Island Cartographer',
            description: 'Visit all major landmarks on the island',
            status: 'locked',
            tier: 5,
            requirements: ['Complete multiple exploration quests'],
            rewards: ['1000 Fame Points', 'Master Explorer title'],
            location: 'Entire island',
            difficulty: 'Extreme'
          }
        ]
      }
    ]
  }
];
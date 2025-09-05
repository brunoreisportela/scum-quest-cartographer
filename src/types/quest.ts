export type QuestStatus = 'locked' | 'available' | 'in-progress' | 'completed';

export type QuestTier = 1 | 2 | 3 | 4 | 5;

export interface Quest {
  id: string;
  name: string;
  description: string;
  status: QuestStatus;
  tier: QuestTier;
  requirements?: string[];
  rewards?: string[];
  location?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard' | 'Extreme';
}

export interface QuestCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  types: QuestType[];
}

export interface QuestType {
  id: string;
  name: string;
  description: string;
  quests: Quest[];
}
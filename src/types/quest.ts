export type QuestStatus = 'locked' | 'available' | 'in-progress' | 'completed';

export type QuestTier = 1 | 2 | 3 | 4 | 5;

// Raw quest data from JSON files
export interface RawQuestData {
  AssociatedNpc: string;
  Tier: number;
  Title: string;
  Description: string;
  TimeLimitHours: number;
  RewardPool: Array<{
    CurrencyNormal?: number;
    Fame?: number;
    TradeDeals?: Array<{
      Item: string;
      Price: number;
      Amount: number;
      Fame: number;
      AllowExcluded: boolean;
    }>;
    Skills?: Array<{
      Skill: string;
      Experience: number;
    }>;
  }>;
  Conditions: Array<{
    TrackingCaption: string;
    SequenceIndex: number;
    CanBeAutoCompleted: boolean;
    Type: string;
    DisablePurchaseOfRequiredItems?: boolean;
    PlayerKeepsItems?: boolean;
    RequiredItems?: Array<{
      AcceptedItems: string[];
      RequiredNum: number;
    }>;
    Locations?: Array<{
      AnchorMesh: string;
      FallbackTransform: string;
      VisibleMesh: string;
      Instance: number;
    }>;
    LocationsShownOnMap?: Array<{
      Location: {
        X: number;
        Y: number;
        Z: number;
      };
      SizeFactor: number;
    }>;
  }>;
}

// Processed quest data for the frontend
export interface Quest {
  id: string;
  name: string;
  description: string;
  status: QuestStatus;
  tier: QuestTier;
  npc: string;
  timeLimitHours: number;
  requirements: string[];
  rewards: string[];
  location?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard' | 'Extreme';
  questType: 'Fetch' | 'Interaction' | 'Mixed';
  rawData: RawQuestData;
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
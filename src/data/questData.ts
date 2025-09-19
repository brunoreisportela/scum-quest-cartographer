import { QuestCategory } from '@/types/quest';
import processedQuestsData from './processedQuests.json';

// Load the processed quest data from the JSON file
export const questCategories: QuestCategory[] = processedQuestsData as QuestCategory[];
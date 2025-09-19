import { useState } from 'react';
import { Quest, QuestCategory } from '@/types/quest';
import { questCategories } from '@/data/questData';
import { QuestTreeVisualization } from '@/components/QuestTreeVisualization';
import { QuestModal } from '@/components/QuestModal';
import { CategorySelector } from '@/components/CategorySelector';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';

const Index = () => {
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<QuestCategory>(questCategories[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleQuestSelect = (quest: Quest) => {
    setSelectedQuest(quest);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedQuest(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/90 backdrop-blur-xl sticky top-0 z-40 shadow-2xl">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="relative">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                  Sentience AI Server
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-lg blur opacity-25"></div>
              </div>
              <div className="text-sm sm:text-lg lg:text-xl font-bold text-slate-200">Quest Cartographer</div>
            </div>
            <div className="hidden sm:block text-xs sm:text-sm text-slate-400 font-medium">
              Navigate • Survive • Conquer
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-3 sm:p-4 lg:p-6 min-h-[calc(100vh-97px)]">
        {/* Mobile Category Selector */}
        <div className="block lg:hidden mb-4">
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CategorySelector
              categories={questCategories}
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 h-full">
          {/* Desktop Category Selector */}
          <div className="hidden lg:block lg:col-span-4">
            <Card className="h-full bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CategorySelector
                categories={questCategories}
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
              />
            </Card>
          </div>

          {/* Quest Tree Visualization */}
          <div className="col-span-1 lg:col-span-8">
            <Card className="h-[calc(100vh-200px)] sm:h-[calc(100vh-180px)] lg:h-full bg-slate-800/30 border-slate-700/50 backdrop-blur-sm overflow-hidden">
              <ScrollArea className="h-full scrollbar-thin">
                <QuestTreeVisualization
                  category={selectedCategory}
                  selectedQuest={selectedQuest}
                  onQuestSelect={handleQuestSelect}
                />
              </ScrollArea>
            </Card>
          </div>
        </div>
      </div>

      {/* Quest Modal */}
      <QuestModal
        quest={selectedQuest}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default Index;

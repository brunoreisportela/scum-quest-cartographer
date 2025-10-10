import { useState } from 'react';
import { Quest, QuestCategory } from '@/types/quest';
import { questCategories } from '@/data/questData';
import { QuestTreeVisualization } from '@/components/QuestTreeVisualization';
import { QuestModal } from '@/components/QuestModal';
import { CategorySelector } from '@/components/CategorySelector';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageToggle from '@/components/LanguageToggle';
import LauncherModal from '@/components/LauncherModal';

const QuestCartographer = () => {
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<QuestCategory>(questCategories[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

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
              <Button
                onClick={() => navigate('/')}
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t('questCartographer.backToServer')}
              </Button>
              <div className="relative">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                  {t('questCartographer.title')}
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-lg blur opacity-25"></div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden lg:block text-xs sm:text-sm text-slate-400 font-medium">
                {t('header.tagline')}
              </div>
              <LanguageToggle />
              <LauncherModal>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-emerald-400/50 text-emerald-300 hover:bg-emerald-500/10 font-semibold"
                >
                  <Download className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">{t('header.launcher')}</span>
                  <span className="sm:hidden">{t('header.launcherShort')}</span>
                </Button>
              </LauncherModal>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-3 sm:p-4 lg:p-6 min-h-[calc(100vh-200px)]">
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

      {/* Footer */}
      <footer className="border-t border-slate-700/50 bg-slate-900/95 backdrop-blur-xl mt-8">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-6">
          <div className="text-center">
            <p className="text-slate-500 text-sm">
              Built with ❤️ for the SCUM community • 
                by Bruno Portela
            </p>
          </div>
        </div>
      </footer>

      {/* Quest Modal */}
      <QuestModal
        quest={selectedQuest}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default QuestCartographer;

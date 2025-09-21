import { useState } from 'react';
import { Quest, QuestCategory } from '@/types/quest';
import { questCategories } from '@/data/questData';
import { QuestTreeVisualization } from '@/components/QuestTreeVisualization';
import { QuestModal } from '@/components/QuestModal';
import { CategorySelector } from '@/components/CategorySelector';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Server, MessageCircle, Copy, ExternalLink, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<QuestCategory>(questCategories[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleQuestSelect = (quest: Quest) => {
    setSelectedQuest(quest);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedQuest(null);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
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
                   Quest Cartographer
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-lg blur opacity-25"></div>
              </div>
              <div className="text-sm sm:text-lg lg:text-xl font-bold text-slate-200"></div>
            </div>
            <div className="hidden sm:block text-xs sm:text-sm text-slate-400 font-medium">
              Navigate • Survive • Conquer
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

      {/* Server Information Footer */}
      <footer className="border-t border-slate-700/50 bg-slate-900/95 backdrop-blur-xl mt-8">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8">
          <div className="text-center mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-200 mb-2">
              Join Our SCUM Server
            </h3>
            <p className="text-slate-400 text-sm sm:text-base">
              Experience the ultimate survival challenge with our community
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {/* Server IP Card */}
            <Card className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border-emerald-400/20 backdrop-blur-sm">
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-emerald-500/20 rounded-lg">
                    <Server className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-200">Server IP</h4>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3 mb-3">
                  <code className="text-emerald-300 font-mono text-sm sm:text-base">
                    70.55.144.65:7779
                  </code>
                </div>
                <Button
                  onClick={() => copyToClipboard('70.55.144.65:7779')}
                  variant="outline"
                  size="sm"
                  className="w-full border-emerald-400/50 text-emerald-300 hover:bg-emerald-500/10"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Server IP
                </Button>
              </div>
            </Card>

            {/* Discord Card */}
            <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-400/20 backdrop-blur-sm">
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-200">Discord Community</h4>
                </div>
                <p className="text-slate-400 text-sm mb-3">
                  Join our Discord server for updates, support, and community discussions
                </p>
                <Button
                  onClick={() => window.open('https://discord.gg/7xY9s6HH7J', '_blank')}
                  variant="outline"
                  size="sm"
                  className="w-full border-blue-400/50 text-blue-300 hover:bg-blue-500/10"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Join Discord
                </Button>
              </div>
            </Card>

            {/* Server Rules Card */}
            <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-400/20 backdrop-blur-sm">
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-200">Server Rules</h4>
                </div>
                <p className="text-slate-400 text-sm mb-3">
                  Read our comprehensive server rules and guidelines for fair play
                </p>
                <Button
                  onClick={() => navigate('/server-rules')}
                  variant="outline"
                  size="sm"
                  className="w-full border-purple-400/50 text-purple-300 hover:bg-purple-500/10"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  View Rules
                </Button>
              </div>
            </Card>
          </div>

          {/* Bottom Credits */}
          <div className="mt-8 pt-6 border-t border-slate-700/30 text-center">
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

export default Index;

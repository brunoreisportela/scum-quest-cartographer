import { useState } from 'react';
import { Quest } from '@/types/quest';
import { questCategories } from '@/data/questData';
import { QuestTree } from '@/components/QuestTree';
import { QuestDetails } from '@/components/QuestDetails';
import { QuestStats } from '@/components/QuestStats';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ScrollArea } from '@/components/ui/scroll-area';

const Index = () => {
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-primary">SCUM</h1>
            <div className="text-lg font-semibold">Quest Cartographer</div>
            <div className="ml-auto text-sm text-muted-foreground">
              Survival • Combat • Exploration
            </div>
          </div>
        </div>
      </header>

      <ResizablePanelGroup direction="horizontal" className="min-h-[calc(100vh-73px)]">
        <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
          <div className="h-full p-4">
            <ScrollArea className="h-full">
              <QuestStats categories={questCategories} />
            </ScrollArea>
          </div>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full p-4">
            <ScrollArea className="h-full">
              <div className="space-y-6">
                {questCategories.map((category) => (
                  <QuestTree
                    key={category.id}
                    category={category}
                    selectedQuest={selectedQuest}
                    onQuestSelect={setSelectedQuest}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
          <div className="h-full p-4">
            <ScrollArea className="h-full">
              {selectedQuest ? (
                <QuestDetails quest={selectedQuest} />
              ) : (
                <div className="flex items-center justify-center h-full text-center">
                  <div className="space-y-3">
                    <div className="text-6xl">🗺️</div>
                    <h3 className="text-lg font-semibold">Select a Quest</h3>
                    <p className="text-sm text-muted-foreground max-w-xs">
                      Choose a quest from the tree to view detailed information, requirements, and rewards.
                    </p>
                  </div>
                </div>
              )}
            </ScrollArea>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Index;

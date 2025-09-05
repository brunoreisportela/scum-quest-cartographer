import { useState } from 'react';
import { QuestCategory, QuestType, Quest } from '@/types/quest';
import { QuestCard } from './QuestCard';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuestTreeProps {
  category: QuestCategory;
  selectedQuest: Quest | null;
  onQuestSelect: (quest: Quest) => void;
}

export function QuestTree({ category, selectedQuest, onQuestSelect }: QuestTreeProps) {
  const [openTypes, setOpenTypes] = useState<Set<string>>(new Set());

  const toggleType = (typeId: string) => {
    const newOpenTypes = new Set(openTypes);
    if (newOpenTypes.has(typeId)) {
      newOpenTypes.delete(typeId);
    } else {
      newOpenTypes.add(typeId);
    }
    setOpenTypes(newOpenTypes);
  };

  const getQuestCounts = (type: QuestType) => {
    const total = type.quests.length;
    const completed = type.quests.filter(q => q.status === 'completed').length;
    const available = type.quests.filter(q => q.status === 'available').length;
    const inProgress = type.quests.filter(q => q.status === 'in-progress').length;
    
    return { total, completed, available, inProgress };
  };

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <span className="text-2xl">{category.icon}</span>
          <div>
            <h3 className="text-lg font-bold">{category.name}</h3>
            <p className="text-sm text-muted-foreground font-normal">
              {category.description}
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {category.types.map((type) => {
          const isOpen = openTypes.has(type.id);
          const counts = getQuestCounts(type);
          
          return (
            <Collapsible key={type.id}>
              <CollapsibleTrigger
                onClick={() => toggleType(type.id)}
                className="w-full"
              >
                <Card className="border-secondary hover:border-primary/50 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {isOpen ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                        <CardTitle className="text-base">{type.name}</CardTitle>
                      </div>
                      <div className="flex gap-1">
                        {counts.completed > 0 && (
                          <Badge variant="outline" className="text-xs bg-quest-completed/20 text-quest-completed border-quest-completed">
                            {counts.completed} ✓
                          </Badge>
                        )}
                        {counts.inProgress > 0 && (
                          <Badge variant="outline" className="text-xs bg-quest-in-progress/20 text-quest-in-progress border-quest-in-progress">
                            {counts.inProgress} ⏳
                          </Badge>
                        )}
                        {counts.available > 0 && (
                          <Badge variant="outline" className="text-xs bg-quest-available/20 text-quest-available border-quest-available">
                            {counts.available} 🎯
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-left text-xs text-muted-foreground">
                      {type.description}
                    </p>
                  </CardHeader>
                </Card>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <div className="mt-3 ml-6 grid gap-2">
                  {type.quests.map((quest) => (
                    <QuestCard
                      key={quest.id}
                      quest={quest}
                      onClick={() => onQuestSelect(quest)}
                      isSelected={selectedQuest?.id === quest.id}
                    />
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </CardContent>
    </Card>
  );
}
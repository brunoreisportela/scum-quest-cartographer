import { Quest } from '@/types/quest';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, CheckCircle, Clock, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuestCardProps {
  quest: Quest;
  onClick: () => void;
  isSelected?: boolean;
}

const statusIcons = {
  locked: Lock,
  available: Target,
  'in-progress': Clock,
  completed: CheckCircle,
};

const statusColors = {
  locked: 'text-quest-locked',
  available: 'text-quest-available',
  'in-progress': 'text-quest-in-progress',
  completed: 'text-quest-completed',
};

const tierColors = {
  1: 'border-tier-1',
  2: 'border-tier-2',
  3: 'border-tier-3',
  4: 'border-tier-4',
  5: 'border-tier-5',
};

const difficultyColors = {
  Easy: 'bg-tier-1',
  Medium: 'bg-tier-2',
  Hard: 'bg-tier-4',
  Extreme: 'bg-tier-5',
};

export function QuestCard({ quest, onClick, isSelected }: QuestCardProps) {
  const StatusIcon = statusIcons[quest.status];
  
  return (
    <Card 
      className={cn(
        'cursor-pointer transition-all duration-200 hover:scale-105 border-2',
        tierColors[quest.tier],
        isSelected && 'ring-2 ring-primary',
        quest.status === 'locked' && 'opacity-60'
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">{quest.name}</CardTitle>
          <StatusIcon className={cn('h-4 w-4', statusColors[quest.status])} />
        </div>
        <CardDescription className="text-xs">
          {quest.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-1 mb-2">
          <Badge variant="outline" className="text-xs">
            Tier {quest.tier}
          </Badge>
          {quest.difficulty && (
            <Badge 
              className={cn(
                'text-xs text-white',
                difficultyColors[quest.difficulty]
              )}
            >
              {quest.difficulty}
            </Badge>
          )}
        </div>
        {quest.location && (
          <p className="text-xs text-muted-foreground">📍 {quest.location}</p>
        )}
      </CardContent>
    </Card>
  );
}
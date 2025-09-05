import { Quest } from '@/types/quest';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Clock, Target, Lock, MapPin, Award, List } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuestDetailsProps {
  quest: Quest;
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
  1: 'border-tier-1 bg-tier-1/10',
  2: 'border-tier-2 bg-tier-2/10',
  3: 'border-tier-3 bg-tier-3/10',
  4: 'border-tier-4 bg-tier-4/10',
  5: 'border-tier-5 bg-tier-5/10',
};

const difficultyColors = {
  Easy: 'bg-tier-1',
  Medium: 'bg-tier-2',
  Hard: 'bg-tier-4',
  Extreme: 'bg-tier-5',
};

export function QuestDetails({ quest }: QuestDetailsProps) {
  const StatusIcon = statusIcons[quest.status];
  
  return (
    <div className="space-y-4">
      <Card className={cn('border-2', tierColors[quest.tier])}>
        <CardHeader>
          <div className="flex items-center gap-3">
            <StatusIcon className={cn('h-6 w-6', statusColors[quest.status])} />
            <div className="flex-1">
              <CardTitle className="text-xl">{quest.name}</CardTitle>
              <CardDescription className="mt-1">
                {quest.description}
              </CardDescription>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="outline" className="text-sm">
              Tier {quest.tier}
            </Badge>
            {quest.difficulty && (
              <Badge 
                className={cn(
                  'text-sm text-white',
                  difficultyColors[quest.difficulty]
                )}
              >
                {quest.difficulty}
              </Badge>
            )}
            <Badge 
              variant="outline" 
              className={cn('text-sm', statusColors[quest.status])}
            >
              {quest.status.replace('-', ' ').toUpperCase()}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {quest.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Location:</span>
              <span className="text-sm text-muted-foreground">{quest.location}</span>
            </div>
          )}
          
          {quest.requirements && quest.requirements.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <List className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Requirements:</span>
              </div>
              <ul className="space-y-1 ml-6">
                {quest.requirements.map((requirement, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                    {requirement}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <Separator />
          
          {quest.rewards && quest.rewards.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Award className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Rewards:</span>
              </div>
              <ul className="space-y-1 ml-6">
                {quest.rewards.map((reward, index) => (
                  <li key={index} className="text-sm text-primary flex items-center gap-2">
                    <span className="w-1 h-1 bg-primary rounded-full" />
                    {reward}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
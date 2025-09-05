import { QuestCategory } from '@/types/quest';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy, Target, Clock, Lock } from 'lucide-react';

interface QuestStatsProps {
  categories: QuestCategory[];
}

export function QuestStats({ categories }: QuestStatsProps) {
  const getAllQuests = () => {
    return categories.flatMap(category => 
      category.types.flatMap(type => type.quests)
    );
  };

  const allQuests = getAllQuests();
  const totalQuests = allQuests.length;
  const completedQuests = allQuests.filter(q => q.status === 'completed').length;
  const availableQuests = allQuests.filter(q => q.status === 'available').length;
  const inProgressQuests = allQuests.filter(q => q.status === 'in-progress').length;
  const lockedQuests = allQuests.filter(q => q.status === 'locked').length;

  const completionPercentage = totalQuests > 0 ? (completedQuests / totalQuests) * 100 : 0;

  const getTierStats = () => {
    const tierCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    const tierCompleted = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    
    allQuests.forEach(quest => {
      tierCounts[quest.tier]++;
      if (quest.status === 'completed') {
        tierCompleted[quest.tier]++;
      }
    });
    
    return { tierCounts, tierCompleted };
  };

  const { tierCounts, tierCompleted } = getTierStats();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Quest Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Overall Completion</span>
              <span className="text-sm text-muted-foreground">
                {completedQuests}/{totalQuests}
              </span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {completionPercentage.toFixed(1)}% Complete
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-quest-completed" />
              <span className="text-sm">Completed</span>
              <Badge variant="outline" className="ml-auto text-quest-completed border-quest-completed">
                {completedQuests}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-quest-available" />
              <span className="text-sm">Available</span>
              <Badge variant="outline" className="ml-auto text-quest-available border-quest-available">
                {availableQuests}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-quest-in-progress" />
              <span className="text-sm">In Progress</span>
              <Badge variant="outline" className="ml-auto text-quest-in-progress border-quest-in-progress">
                {inProgressQuests}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-quest-locked" />
              <span className="text-sm">Locked</span>
              <Badge variant="outline" className="ml-auto text-quest-locked border-quest-locked">
                {lockedQuests}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tier Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[1, 2, 3, 4, 5].map(tier => {
            const total = tierCounts[tier as keyof typeof tierCounts];
            const completed = tierCompleted[tier as keyof typeof tierCompleted];
            const percentage = total > 0 ? (completed / total) * 100 : 0;
            
            return (
              <div key={tier}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Tier {tier}</span>
                  <span className="text-xs text-muted-foreground">
                    {completed}/{total}
                  </span>
                </div>
                <Progress 
                  value={percentage} 
                  className="h-1.5"
                />
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
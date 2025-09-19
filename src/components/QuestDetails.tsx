import { Quest } from '@/types/quest';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Clock, Target, Lock, MapPin, Award, List, User, Timer, Zap } from 'lucide-react';
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
  locked: 'text-slate-400',
  available: 'text-blue-400',
  'in-progress': 'text-yellow-400',
  completed: 'text-emerald-400',
};

const tierColors = {
  1: 'border-green-400/50 bg-gradient-to-br from-green-500/10 to-emerald-500/10',
  2: 'border-blue-400/50 bg-gradient-to-br from-blue-500/10 to-cyan-500/10',
  3: 'border-purple-400/50 bg-gradient-to-br from-purple-500/10 to-violet-500/10',
  4: 'border-orange-400/50 bg-gradient-to-br from-orange-500/10 to-red-500/10',
  5: 'border-red-400/50 bg-gradient-to-br from-red-500/10 to-pink-500/10',
};

const difficultyColors = {
  Easy: 'bg-green-500 text-white',
  Medium: 'bg-blue-500 text-white',
  Hard: 'bg-orange-500 text-white',
  Extreme: 'bg-red-500 text-white',
};

const questTypeIcons = {
  Fetch: '📦',
  Interaction: '🤝',
  Mixed: '⚡',
};

export function QuestDetails({ quest }: QuestDetailsProps) {
  const StatusIcon = statusIcons[quest.status];
  
  return (
    <div className="p-6 h-full">
      <Card className={cn('border-2 bg-slate-800/50 backdrop-blur-sm', tierColors[quest.tier])}>
        <CardHeader>
          <div className="flex items-start gap-3">
            <StatusIcon className={cn('h-7 w-7 mt-1', statusColors[quest.status])} />
            <div className="flex-1">
              <CardTitle className="text-xl text-slate-200 leading-tight">{quest.name}</CardTitle>
              <CardDescription className="mt-2 text-slate-400 leading-relaxed">
                {quest.description}
              </CardDescription>
            </div>
            <div className="text-3xl">{questTypeIcons[quest.questType]}</div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="outline" className="text-sm bg-slate-700/50 border-slate-600 text-slate-300">
              Tier {quest.tier}
            </Badge>
            {quest.difficulty && (
              <Badge className={cn('text-sm', difficultyColors[quest.difficulty])}>
                {quest.difficulty}
              </Badge>
            )}
            <Badge 
              variant="outline" 
              className={cn('text-sm border-slate-600', statusColors[quest.status], 'bg-slate-700/30')}
            >
              {quest.status.replace('-', ' ').toUpperCase()}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-5">
          {/* Quest Info */}
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
              <User className="h-4 w-4 text-slate-400" />
              <span className="text-sm font-medium text-slate-300">NPC:</span>
              <span className="text-sm text-slate-200">{quest.npc}</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
              <Timer className="h-4 w-4 text-slate-400" />
              <span className="text-sm font-medium text-slate-300">Time Limit:</span>
              <span className="text-sm text-slate-200">{quest.timeLimitHours} hours</span>
            </div>
            
            {quest.location && (
              <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                <MapPin className="h-4 w-4 text-slate-400" />
                <span className="text-sm font-medium text-slate-300">Location:</span>
                <span className="text-sm text-slate-200">{quest.location}</span>
              </div>
            )}
          </div>
          
          {quest.requirements && quest.requirements.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <List className="h-5 w-5 text-slate-400" />
                <span className="text-sm font-semibold text-slate-300">Requirements</span>
              </div>
              <div className="space-y-2">
                {quest.requirements.map((requirement, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-slate-700/20 rounded-lg border border-slate-600/30">
                    <div className="w-2 h-2 bg-slate-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-slate-300 leading-relaxed">{requirement}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <Separator className="bg-slate-600/50" />
          
          {quest.rewards && quest.rewards.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Award className="h-5 w-5 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-300">Rewards</span>
              </div>
              <div className="space-y-2">
                {quest.rewards.map((reward, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-emerald-500/10 rounded-lg border border-emerald-400/20">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-emerald-300 leading-relaxed">{reward}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
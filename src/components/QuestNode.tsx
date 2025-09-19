import { Quest } from '@/types/quest';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Target, Lock, User, Timer } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuestNodeProps {
  quest: Quest;
  isSelected: boolean;
  onClick: () => void;
}

const statusIcons = {
  locked: Lock,
  available: Target,
  'in-progress': Clock,
  completed: CheckCircle,
};

const statusColors = {
  locked: 'text-slate-400 bg-slate-500/10 border-slate-500/30',
  available: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
  'in-progress': 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
  completed: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
};

const statusBgColors = {
  locked: 'from-slate-500/5 to-slate-600/10',
  available: 'from-blue-500/10 to-cyan-500/10',
  'in-progress': 'from-yellow-500/10 to-orange-500/10',
  completed: 'from-emerald-500/10 to-green-500/10',
};

const questTypeIcons = {
  Fetch: '📦',
  Interaction: '🤝',
  Mixed: '⚡',
};

export function QuestNode({ quest, isSelected, onClick }: QuestNodeProps) {
  const StatusIcon = statusIcons[quest.status];
  
  return (
    <Card
      className={cn(
        'cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 group relative overflow-hidden',
        'w-48 h-24 sm:w-56 sm:h-28 lg:w-64 lg:h-32 border-2 touch-manipulation',
        isSelected 
          ? 'ring-2 ring-emerald-400 ring-offset-2 ring-offset-slate-900 shadow-2xl shadow-emerald-500/20' 
          : 'hover:shadow-xl hover:shadow-slate-900/50',
        statusColors[quest.status]
      )}
      onClick={onClick}
    >
      {/* Background Gradient */}
      <div className={cn(
        'absolute inset-0 bg-gradient-to-br opacity-50',
        statusBgColors[quest.status]
      )} />
      
      {/* Tier Indicator */}
      <div className="absolute top-1 right-1 sm:top-2 sm:right-2">
        <div className={cn(
          'w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs font-bold',
          'bg-slate-800 border border-slate-600 text-slate-300'
        )}>
          {quest.tier}
        </div>
      </div>

      <CardContent className="p-2 sm:p-3 lg:p-4 relative z-10 h-full flex flex-col">
        <div className="flex items-start gap-1 sm:gap-2 mb-1 sm:mb-2">
          <StatusIcon className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-xs sm:text-sm text-slate-200 line-clamp-2 group-hover:text-white transition-colors">
              {quest.name}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
          <User className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-slate-400" />
          <span className="text-xs text-slate-400 truncate flex-1">{quest.npc}</span>
          <span className="text-lg sm:text-xl lg:text-2xl">{questTypeIcons[quest.questType]}</span>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Timer className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-slate-400" />
            <span className="text-xs text-slate-400">{quest.timeLimitHours}h</span>
          </div>
          
          {quest.difficulty && (
            <Badge 
              variant="outline" 
              className="text-xs h-4 sm:h-5 px-1 sm:px-2 bg-slate-700/50 border-slate-600 text-slate-300"
            >
              {quest.difficulty}
            </Badge>
          )}
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-blue-500/0 group-hover:from-emerald-500/5 group-hover:to-blue-500/5 transition-all duration-300 rounded-lg" />
      </CardContent>
    </Card>
  );
}

import { Quest } from '@/types/quest';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Clock, Target, Lock, MapPin, Award, List, User, Timer, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface QuestModalProps {
  quest: Quest | null;
  isOpen: boolean;
  onClose: () => void;
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

export function QuestModal({ quest, isOpen, onClose }: QuestModalProps) {
  if (!isOpen || !quest) return null;

  const StatusIcon = statusIcons[quest.status];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative z-10 w-full max-w-xs sm:max-w-md lg:max-w-2xl max-h-[95vh] sm:max-h-[90vh] mx-2 sm:mx-4 overflow-hidden">
        <Card className={cn(
          'border-2 bg-slate-900/95 backdrop-blur-xl shadow-2xl',
          tierColors[quest.tier]
        )}>
          {/* Header */}
          <CardHeader className="relative p-4 sm:p-6">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 sm:top-4 sm:right-4 h-8 w-8 p-0 text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
            
            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 pr-10 sm:pr-12">
              <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <StatusIcon className={cn('h-6 w-6 sm:h-8 sm:w-8', statusColors[quest.status])} />
                <div className="text-2xl sm:text-3xl lg:text-4xl">{questTypeIcons[quest.questType]}</div>
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg sm:text-xl lg:text-2xl text-slate-200 leading-tight mb-2">
                  {quest.name}
                </CardTitle>
                <CardDescription className="text-slate-400 leading-relaxed text-sm sm:text-base">
                  {quest.description}
                </CardDescription>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 mt-6">
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
          
          {/* Content */}
          <CardContent className="space-y-4 sm:space-y-6 max-h-[50vh] sm:max-h-[60vh] overflow-y-auto scrollbar-thin p-4 sm:p-6">
            {/* Quest Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="flex items-center gap-3 p-3 sm:p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <User className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                <div>
                  <span className="text-xs sm:text-sm font-medium text-slate-300">NPC</span>
                  <p className="text-sm sm:text-base text-slate-200">{quest.npc}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 sm:p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <Timer className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                <div>
                  <span className="text-xs sm:text-sm font-medium text-slate-300">Time Limit</span>
                  <p className="text-sm sm:text-base text-slate-200">{quest.timeLimitHours} hours</p>
                </div>
              </div>
              
              {quest.location && (
                <div className="flex items-center gap-3 p-3 sm:p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 sm:col-span-2">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                  <div>
                    <span className="text-xs sm:text-sm font-medium text-slate-300">Location</span>
                    <p className="text-sm sm:text-base text-slate-200">{quest.location}</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Requirements */}
            {quest.requirements && quest.requirements.length > 0 && (
              <div>
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <List className="h-5 w-5 sm:h-6 sm:w-6 text-slate-400" />
                  <h3 className="text-base sm:text-lg font-semibold text-slate-300">Requirements</h3>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  {quest.requirements.map((requirement, index) => (
                    <div key={index} className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-slate-400 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-slate-300 leading-relaxed">{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <Separator className="bg-slate-700/50" />
            
            {/* Rewards */}
            {quest.rewards && quest.rewards.length > 0 && (
              <div>
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <Award className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400" />
                  <h3 className="text-base sm:text-lg font-semibold text-emerald-300">Rewards</h3>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  {quest.rewards.map((reward, index) => (
                    <div key={index} className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-emerald-500/10 rounded-lg border border-emerald-400/20">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-400 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-emerald-300 leading-relaxed">{reward}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

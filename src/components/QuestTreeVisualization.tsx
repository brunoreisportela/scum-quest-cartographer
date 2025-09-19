import { useState, useMemo } from 'react';
import { QuestCategory, Quest, QuestTier } from '@/types/quest';
import { QuestNode } from '@/components/QuestNode';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface QuestTreeVisualizationProps {
  category: QuestCategory;
  selectedQuest: Quest | null;
  onQuestSelect: (quest: Quest) => void;
}

export function QuestTreeVisualization({ category, selectedQuest, onQuestSelect }: QuestTreeVisualizationProps) {
  const [expandedTiers, setExpandedTiers] = useState<Set<QuestTier>>(new Set([1, 2]));

  // Organize quests by tier
  const questsByTier = useMemo(() => {
    const tiers: Record<QuestTier, Quest[]> = { 1: [], 2: [], 3: [], 4: [], 5: [] };
    
    category.types.forEach(type => {
      type.quests.forEach(quest => {
        tiers[quest.tier].push(quest);
      });
    });
    
    return tiers;
  }, [category]);

  const toggleTier = (tier: QuestTier) => {
    const newExpanded = new Set(expandedTiers);
    if (newExpanded.has(tier)) {
      newExpanded.delete(tier);
    } else {
      newExpanded.add(tier);
    }
    setExpandedTiers(newExpanded);
  };

  const getTierStats = (tier: QuestTier) => {
    const quests = questsByTier[tier];
    return {
      total: quests.length,
      completed: quests.filter(q => q.status === 'completed').length,
      available: quests.filter(q => q.status === 'available').length,
      locked: quests.filter(q => q.status === 'locked').length,
    };
  };

  const tierColors: Record<QuestTier, string> = {
    1: 'from-green-500/20 to-emerald-500/20 border-green-400/50',
    2: 'from-blue-500/20 to-cyan-500/20 border-blue-400/50',
    3: 'from-purple-500/20 to-violet-500/20 border-purple-400/50',
    4: 'from-orange-500/20 to-red-500/20 border-orange-400/50',
    5: 'from-red-500/20 to-pink-500/20 border-red-400/50',
  };

  const tierLabels: Record<QuestTier, string> = {
    1: 'Novice',
    2: 'Apprentice', 
    3: 'Journeyman',
    4: 'Expert',
    5: 'Master',
  };

  return (
    <div className="h-full p-6">
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-2">
          <span className="text-4xl">{category.icon}</span>
          <div>
            <h2 className="text-2xl font-bold text-slate-200">{category.name}</h2>
            <p className="text-slate-400">{category.description}</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {([1, 2, 3, 4, 5] as QuestTier[]).map((tier) => {
          const quests = questsByTier[tier];
          const stats = getTierStats(tier);
          const isExpanded = expandedTiers.has(tier);
          
          if (quests.length === 0) return null;

          return (
            <div key={tier} className="relative">
              {/* Connection Line to Previous Tier */}
              {tier > 1 && questsByTier[tier - 1].length > 0 && (
                <div className="absolute -top-6 left-1/2 w-0.5 h-6 bg-gradient-to-b from-slate-600 to-transparent transform -translate-x-0.5"></div>
              )}
              
              {/* Tier Header */}
              <Card 
                className={cn(
                  'cursor-pointer transition-all duration-300 hover:scale-[1.01]',
                  'bg-gradient-to-r border-2',
                  tierColors[tier],
                  isExpanded ? 'shadow-lg' : 'hover:shadow-md'
                )}
                onClick={() => toggleTier(tier)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          'w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm',
                          'bg-gradient-to-br from-slate-700 to-slate-800 text-slate-200 border border-slate-600'
                        )}>
                          {tier}
                        </div>
                        <span className="text-lg text-slate-200">Tier {tier} - {tierLabels[tier]}</span>
                      </div>
                    </CardTitle>
                    
                    <div className="flex items-center gap-3">
                      <div className="flex gap-2">
                        {stats.completed > 0 && (
                          <Badge className="bg-emerald-500/20 border-emerald-400 text-emerald-300">
                            {stats.completed} ✓
                          </Badge>
                        )}
                        {stats.available > 0 && (
                          <Badge className="bg-blue-500/20 border-blue-400 text-blue-300">
                            {stats.available} 🎯
                          </Badge>
                        )}
                        {stats.locked > 0 && (
                          <Badge className="bg-slate-500/20 border-slate-400 text-slate-400">
                            {stats.locked} 🔒
                          </Badge>
                        )}
                      </div>
                      
                      {/* Simple minimalistic chevron */}
                      <div className={cn(
                        'transition-transform duration-200 text-slate-400',
                        isExpanded ? 'rotate-90' : 'rotate-0'
                      )}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Quest Nodes */}
              {isExpanded && (
                <div className="mt-4">
                  {/* Quest Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8">
                    {quests.map((quest, index) => (
                      <div
                        key={quest.id}
                        className={cn(
                          'transition-all duration-200 flex justify-center',
                          'sm:block',
                          index % 2 === 0 ? 'sm:justify-self-end' : 'sm:justify-self-start'
                        )}
                      >
                        <QuestNode
                          quest={quest}
                          isSelected={false}
                          onClick={() => onQuestSelect(quest)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { QuestCategory } from '@/types/quest';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface CategorySelectorProps {
  categories: QuestCategory[];
  selectedCategory: QuestCategory;
  onCategorySelect: (category: QuestCategory) => void;
}

export function CategorySelector({ categories, selectedCategory, onCategorySelect }: CategorySelectorProps) {
  const getCategoryStats = (category: QuestCategory) => {
    const totalQuests = category.types.reduce((total, type) => total + type.quests.length, 0);
    const completedQuests = category.types.reduce(
      (total, type) => total + type.quests.filter(q => q.status === 'completed').length,
      0
    );
    const availableQuests = category.types.reduce(
      (total, type) => total + type.quests.filter(q => q.status === 'available').length,
      0
    );
    
    return { totalQuests, completedQuests, availableQuests };
  };

  return (
    <div className="h-full">
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="text-base sm:text-lg text-slate-200 flex items-center gap-2">
          <span className="text-xl sm:text-2xl">🗂️</span>
          <span className="hidden sm:inline">Quest Categories</span>
          <span className="sm:hidden">Categories</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 sm:space-y-3">
        {categories.map((category) => {
          const isSelected = selectedCategory.id === category.id;
          const stats = getCategoryStats(category);
          
          return (
            <Card
              key={category.id}
              className={cn(
                'cursor-pointer transition-all duration-200 hover:scale-[1.02] group',
                'border-slate-600/50 hover:border-emerald-400/50',
                isSelected 
                  ? 'bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border-emerald-400/70 shadow-lg shadow-emerald-500/10' 
                  : 'bg-slate-700/30 hover:bg-slate-700/50'
              )}
              onClick={() => onCategorySelect(category)}
            >
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <span className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform duration-200">
                    {category.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className={cn(
                      'font-bold text-sm sm:text-base truncate',
                      isSelected ? 'text-emerald-300' : 'text-slate-200'
                    )}>
                      {category.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-1 sm:line-clamp-2">
                      {category.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 sm:gap-1.5">
                  <Badge 
                    variant="outline" 
                    className="text-xs bg-slate-600/30 border-slate-500 text-slate-300"
                  >
                    <span className="hidden sm:inline">{stats.totalQuests} total</span>
                    <span className="sm:hidden">{stats.totalQuests}</span>
                  </Badge>
                  {stats.completedQuests > 0 && (
                    <Badge 
                      variant="outline" 
                      className="text-xs bg-emerald-500/20 border-emerald-400 text-emerald-300"
                    >
                      {stats.completedQuests} ✓
                    </Badge>
                  )}
                  {stats.availableQuests > 0 && (
                    <Badge 
                      variant="outline" 
                      className="text-xs bg-blue-500/20 border-blue-400 text-blue-300"
                    >
                      {stats.availableQuests} 🎯
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </CardContent>
    </div>
  );
}

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LatexRenderer } from './LatexRenderer';
import { StarRating } from './StarRating';
import { Link } from 'wouter';
import type { Formula } from '@shared/schema';

interface FormulaCardProps {
  formula: Formula;
  topicName?: string;
}

export function FormulaCard({ formula, topicName }: FormulaCardProps) {
  const difficultyLabels = ['', 'Básico', 'Intermedio', 'Avanzado', 'Muy Avanzado', 'Experto'];
  
  return (
    <Link href={`/formula/${formula.id}`}>
      <Card className="p-6 hover-elevate active-elevate-2 transition-all cursor-pointer h-full flex flex-col" data-testid={`formula-card-${formula.id}`}>
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-semibold flex-1" data-testid={`formula-name-${formula.id}`}>
            {formula.name}
          </h3>
          <Badge variant="outline" className="ml-2 text-xs">
            {difficultyLabels[formula.difficulty]}
          </Badge>
        </div>
        
        <div className="my-4 flex items-center justify-center bg-muted/30 rounded-md p-4 min-h-[80px]">
          <LatexRenderer latex={formula.latex} displayMode={true} className="text-center" />
        </div>
        
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
          {formula.description}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-border">
          {topicName && (
            <Badge variant="secondary" className="text-xs">
              {topicName}
            </Badge>
          )}
          <StarRating 
            rating={formula.averageRating || 0} 
            showCount 
            count={formula.ratingCount || 0}
            size={16}
          />
        </div>
      </Card>
    </Link>
  );
}

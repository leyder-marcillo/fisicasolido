import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StarRating } from './StarRating';
import { Link } from 'wouter';
import { CheckCircle2 } from 'lucide-react';
import type { Exercise } from '@shared/schema';

interface ExerciseCardProps {
  exercise: Exercise;
  topicName?: string;
  isSolved?: boolean;
}

export function ExerciseCard({ exercise, topicName, isSolved }: ExerciseCardProps) {
  const difficultyLabels = ['', 'Básico', 'Intermedio', 'Avanzado', 'Muy Avanzado', 'Experto'];
  
  return (
    <Link href={`/exercise/${exercise.id}`}>
      <Card className="p-6 hover-elevate active-elevate-2 transition-all cursor-pointer h-full flex flex-col" data-testid={`exercise-card-${exercise.id}`}>
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-semibold flex-1" data-testid={`exercise-title-${exercise.id}`}>
            {exercise.title}
          </h3>
          <div className="flex items-center gap-2 ml-2">
            {isSolved && (
              <CheckCircle2 className="w-5 h-5 text-primary" data-testid="solved-badge" />
            )}
            <Badge variant="outline" className="text-xs">
              {difficultyLabels[exercise.difficulty]}
            </Badge>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-3">
          {exercise.problemStatement}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-border">
          {topicName && (
            <Badge variant="secondary" className="text-xs">
              {topicName}
            </Badge>
          )}
          <StarRating 
            rating={exercise.averageRating || 0} 
            showCount 
            count={exercise.ratingCount || 0}
            size={16}
          />
        </div>
      </Card>
    </Link>
  );
}

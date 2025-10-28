import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  onRate?: (rating: number) => void;
  size?: number;
  showCount?: boolean;
  count?: number;
  className?: string;
}

export function StarRating({ 
  rating, 
  maxRating = 5, 
  onRate, 
  size = 20, 
  showCount = false,
  count = 0,
  className = '' 
}: StarRatingProps) {
  const stars = Array.from({ length: maxRating }, (_, i) => i + 1);
  const isInteractive = !!onRate;

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex items-center">
        {stars.map((star) => {
          const isFilled = star <= Math.round(rating);
          return (
            <button
              key={star}
              onClick={() => onRate?.(star)}
              disabled={!isInteractive}
              className={`${isInteractive ? 'cursor-pointer hover-elevate active-elevate-2 rounded' : 'cursor-default'} p-0.5 transition-all`}
              data-testid={`star-${star}`}
              aria-label={`${star} stars`}
            >
              <Star
                size={size}
                className={`${isFilled ? 'fill-primary text-primary' : 'fill-muted text-muted'} transition-colors`}
              />
            </button>
          );
        })}
      </div>
      {showCount && (
        <span className="text-xs text-muted-foreground ml-1" data-testid="rating-count">
          ({count})
        </span>
      )}
    </div>
  );
}

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';
import { LucideIcon } from 'lucide-react';

interface TopicCardProps {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  formulaCount: number;
}

export function TopicCard({ id, name, description, icon: Icon, formulaCount }: TopicCardProps) {
  return (
    <Link href={`/topic/${id}`} data-testid={`link-topic-${id}`}>
      <Card className="p-6 hover-elevate active-elevate-2 transition-all cursor-pointer h-full" data-testid={`topic-card-${id}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-primary/10 rounded-md">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <Badge variant="secondary" className="text-xs" data-testid={`formula-count-${id}`}>
              {formulaCount} fórmulas
            </Badge>
          </div>
          <h3 className="text-xl font-semibold mb-2" data-testid={`topic-name-${id}`}>
            {name}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed flex-1">
            {description}
          </p>
        </div>
      </Card>
    </Link>
  );
}

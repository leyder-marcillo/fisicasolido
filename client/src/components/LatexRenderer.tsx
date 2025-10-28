import { useEffect, useRef } from 'react';
import katex from 'katex';

interface LatexRendererProps {
  latex: string;
  className?: string;
  displayMode?: boolean;
}

export function LatexRenderer({ latex, className = '', displayMode = true }: LatexRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      try {
        katex.render(latex, containerRef.current, {
          displayMode,
          throwOnError: false,
          trust: true,
        });
      } catch (error) {
        console.error('Error rendering LaTeX:', error);
      }
    }
  }, [latex, displayMode]);

  return <div ref={containerRef} className={className} data-testid="latex-formula" />;
}

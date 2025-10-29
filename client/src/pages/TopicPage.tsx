import { useQuery } from '@tanstack/react-query';
import { useRoute, Link } from 'wouter';
import { Navbar } from '@/components/Navbar';
import { FormulaCard } from '@/components/FormulaCard';
import { ExerciseCard } from '@/components/ExerciseCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft } from 'lucide-react';
import type { Topic, Formula, Exercise } from '@shared/schema';

export default function TopicPage() {
  const [, params] = useRoute('/topic/:id');
  const topicId = params?.id;

  const { data: topics = [], isLoading: topicsLoading } = useQuery<Topic[]>({
    queryKey: ['/api/topics'],
    queryFn: async () => {
      const res = await fetch('/api/topics');
      if (!res.ok) throw new Error('Error al cargar temas');
      return res.json();
    },
  });

  const topic = topics.find(t => t.id === topicId || t.slug === topicId);
  
  const { data: formulas = [], isLoading: formulasLoading } = useQuery<Formula[]>({
    queryKey: ['/api/formulas'],
  });

  const { data: exercises = [], isLoading: exercisesLoading } = useQuery<Exercise[]>({
    queryKey: ['/api/exercises'],
  });

  const topicFormulas = formulas.filter(f => f.topicId === topicId);
  const topicExercises = exercises.filter(e => e.topicId === topicId);

  if (topicsLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-card rounded w-1/3" />
            <div className="h-32 bg-card rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground">Tema no encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6 -ml-2" data-testid="back-button">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4" data-testid="topic-name">
            {topic.name}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl" data-testid="topic-description">
            {topic.description}
          </p>
        </div>

        <Tabs defaultValue="formulas" className="w-full">
          <TabsList>
            <TabsTrigger value="formulas" data-testid="tab-formulas">
              Fórmulas ({topicFormulas.length})
            </TabsTrigger>
            <TabsTrigger value="exercises" data-testid="tab-exercises">
              Ejercicios ({topicExercises.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="formulas" className="mt-8">
            {formulasLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-64 bg-card animate-pulse rounded-lg" />
                ))}
              </div>
            ) : topicFormulas.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topicFormulas.map(formula => (
                  <FormulaCard
                    key={formula.id}
                    formula={formula}
                    topicName={topic.name}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-4" data-testid="empty-state-formulas">
                <p className="text-lg text-muted-foreground text-center mb-2">
                  No hay fórmulas disponibles para este tema.
                </p>
                <p className="text-sm text-muted-foreground/70 text-center">
                  Las fórmulas se agregarán próximamente.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="exercises" className="mt-8">
            {exercisesLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-64 bg-card animate-pulse rounded-lg" />
                ))}
              </div>
            ) : topicExercises.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topicExercises.map(exercise => (
                  <ExerciseCard
                    key={exercise.id}
                    exercise={exercise}
                    topicName={topic.name}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-4" data-testid="empty-state-exercises">
                <p className="text-lg text-muted-foreground text-center mb-2">
                  No hay ejercicios disponibles para este tema.
                </p>
                <p className="text-sm text-muted-foreground/70 text-center">
                  Los ejercicios se agregarán próximamente.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

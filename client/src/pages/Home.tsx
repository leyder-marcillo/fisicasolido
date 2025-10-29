import ExerciseList from "@/components/ExerciseList";
import { useQuery } from '@tanstack/react-query';
import { TopicCard } from '@/components/TopicCard';
import { FormulaCard } from '@/components/FormulaCard';
import { ExerciseCard } from '@/components/ExerciseCard';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, FlaskConical, Atom, Zap, Layers, Diamond } from 'lucide-react';
import type { Topic, Formula, Exercise } from '@shared/schema';
import heroImage from '@assets/generated_images/Crystalline_lattice_structure_hero_3c763815.png';
import { useState } from 'react';

const TOPIC_ICONS = {
  'crystal-structure': Layers,
  'band-theory': Zap,
  'semiconductors': Diamond,
  'superconductivity': FlaskConical,
  'quantum-mechanics': Atom,
  'default': BookOpen,
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: topics = [], isLoading: topicsLoading } = useQuery<Topic[]>({
    queryKey: ['/api/topics'],
    queryFn: async () => {
      const res = await fetch('/api/topics');
      if (!res.ok) throw new Error('Error al cargar temas');
      return res.json();
    },
  });
  const { data: formulas = [], isLoading: formulasLoading } = useQuery<Formula[]>({
    queryKey: ['/api/formulas'],
    queryFn: async () => {
      const res = await fetch('/api/formulas');
      if (!res.ok) throw new Error('Error al cargar fórmulas');
      return res.json();
    },
  });
  const { data: exercises = [], isLoading: exercisesLoading } = useQuery<Exercise[]>({
    queryKey: ['/api/exercises'],
    queryFn: async () => {
      const res = await fetch('/api/exercises');
      if (!res.ok) throw new Error('Error al cargar ejercicios');
      return res.json();
    },
  });
  const getTopicIcon = (icon: string) => {
    return TOPIC_ICONS[icon as keyof typeof TOPIC_ICONS] || TOPIC_ICONS.default;
  };

  const getTopicName = (topicId: string) => {
    return topics.find(t => t.id === topicId)?.name || '';
  };

  const filterBySearch = <T extends { name?: string; title?: string; description?: string }>(items: T[]) => {
    if (!searchQuery.trim()) return items;
    const query = searchQuery.toLowerCase();
    return items.filter(item => {
      const searchable = [
        item.name || '',
        item.title || '',
        item.description || ''
      ].join(' ').toLowerCase();
      return searchable.includes(query);
    });
  };

  const featuredFormulas = filterBySearch(formulas).slice(0, 6);
  const featuredExercises = filterBySearch(exercises).slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onSearch={setSearchQuery} />
      
      <section 
        className="relative h-96 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" data-testid="hero-title">
            Física del Estado Sólido
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Explora fórmulas, resuelve ejercicios y domina los conceptos fundamentales
          </p>
          <Button 
            size="lg" 
            className="bg-primary text-primary-foreground border border-primary-border hover:bg-primary"
            data-testid="hero-cta"
          >
            Comenzar a Aprender
          </Button>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8" data-testid="topics-section-title">
            Temas de Estudio
          </h2>
          
          {topicsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-48 bg-card animate-pulse rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topics.map(topic => (
                <TopicCard
                  key={topic.id}
                  id={topic.id}
                  name={topic.name}
                  description={topic.description}
                  icon={getTopicIcon(topic.icon)}
                  formulaCount={formulas.filter(f => f.topicId === topic.id).length}
                />
              ))}
            </div>
          )}
        </section>

        <section>
          <Tabs defaultValue="formulas" className="w-full">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold">Contenido Destacado</h2>
              <TabsList>
                <TabsTrigger value="formulas" data-testid="tab-formulas">Fórmulas</TabsTrigger>
                <TabsTrigger value="exercises" data-testid="tab-exercises">Ejercicios</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="formulas" className="mt-0">
              {formulasLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-64 bg-card animate-pulse rounded-lg" />
                  ))}
                </div>
              ) : featuredFormulas.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredFormulas.map(formula => (
                    <FormulaCard
                      key={formula.id}
                      formula={formula}
                      topicName={getTopicName(formula.topicId)}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 px-4" data-testid="empty-state-formulas">
                  <p className="text-lg text-muted-foreground text-center">
                    No se encontraron fórmulas{searchQuery ? ` para "${searchQuery}"` : ''}.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="exercises" className="mt-0">
              {exercisesLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-64 bg-card animate-pulse rounded-lg" />
                  ))}
                </div>
              ) : featuredExercises.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredExercises.map(exercise => (
                    <ExerciseCard
                      key={exercise.id}
                      exercise={exercise}
                      topicName={getTopicName(exercise.topicId)}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 px-4" data-testid="empty-state-exercises">
                  <p className="text-lg text-muted-foreground text-center">
                    No se encontraron ejercicios{searchQuery ? ` para "${searchQuery}"` : ''}.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
          <section className="mt-16">
            <h2 className="text-2xl font-semibold mb-8"></h2>
            <ExerciseList />
          </section>
        </section>
      </main>
    </div>
  );
}

import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useRoute } from 'wouter';
import { Navbar } from '@/components/Navbar';
import { LatexRenderer } from '@/components/LatexRenderer';
import { StarRating } from '@/components/StarRating';
import { CommentItem } from '@/components/CommentItem';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import type { Formula, Topic, Comment } from '@shared/schema';

export default function FormulaDetail() {
  const [, params] = useRoute('/formula/:id');
  const formulaId = params?.id;
  const [commentText, setCommentText] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const { data: formula, isLoading: formulaLoading } = useQuery<Formula>({
    queryKey: ['/api/formulas', formulaId],
    enabled: !!formulaId,
  });

  const { data: topic } = useQuery<Topic>({
    queryKey: ['/api/topics', formula?.topicId],
    enabled: !!formula?.topicId,
  });

  const { data: comments = [] } = useQuery<Comment[]>({
    queryKey: ['/api/comments', 'formula', formulaId],
    queryFn: async () => {
      const res = await fetch(`/api/comments?targetType=formula&targetId=${formulaId}`);
      if (!res.ok) throw new Error('Failed to fetch comments');
      return res.json();
    },
    enabled: !!formulaId,
  });

  const addCommentMutation = useMutation({
    mutationFn: async (data: { content: string; parentId?: string }) => {
      return apiRequest('POST', '/api/comments', {
        content: data.content,
        author: 'Usuario Anónimo',
        targetType: 'formula',
        targetId: formulaId,
        parentId: data.parentId || null,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/comments', 'formula', formulaId] });
      setCommentText('');
      setReplyingTo(null);
    },
  });

  const voteCommentMutation = useMutation({
    mutationFn: async ({ commentId, type }: { commentId: string; type: 'up' | 'down' }) => {
      return apiRequest('POST', `/api/comments/${commentId}/vote`, { type });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/comments', 'formula', formulaId] });
    },
  });

  const rateFormulaMutation = useMutation({
    mutationFn: async (rating: number) => {
      return apiRequest('POST', '/api/ratings', {
        targetType: 'formula',
        targetId: formulaId,
        rating,
        userId: 'anonymous',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/formulas', formulaId] });
      queryClient.invalidateQueries({ queryKey: ['/api/formulas'] });
    },
  });

  const handleSubmitComment = () => {
    if (commentText.trim()) {
      addCommentMutation.mutate({ content: commentText, parentId: replyingTo || undefined });
    }
  };

  const topLevelComments = comments.filter(c => !c.parentId);
  const getReplies = (commentId: string) => comments.filter(c => c.parentId === commentId);
  
  const buildCommentTree = (parentId: string | null = null): Comment[] => {
    return comments.filter(c => c.parentId === parentId);
  };

  const difficultyLabels = ['', 'Básico', 'Intermedio', 'Avanzado', 'Muy Avanzado', 'Experto'];

  if (formulaLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-card rounded w-1/3" />
            <div className="h-64 bg-card rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!formula) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground">Fórmula no encontrada</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-8">
              <div className="flex items-start justify-between mb-6">
                <h1 className="text-3xl font-bold" data-testid="formula-name">
                  {formula.name}
                </h1>
                <Badge variant="outline">
                  {difficultyLabels[formula.difficulty]}
                </Badge>
              </div>

              <div className="bg-muted/30 rounded-lg p-8 my-8 flex items-center justify-center min-h-[120px]">
                <LatexRenderer latex={formula.latex} displayMode={true} className="text-2xl" />
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Descripción</h2>
                  <p className="text-muted-foreground leading-relaxed" data-testid="formula-description">
                    {formula.description}
                  </p>
                </div>

                {formula.derivation && (
                  <>
                    <Separator />
                    <div>
                      <h2 className="text-xl font-semibold mb-3">Derivación</h2>
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                        {formula.derivation}
                      </p>
                    </div>
                  </>
                )}

                {formula.applications && (
                  <>
                    <Separator />
                    <div>
                      <h2 className="text-xl font-semibold mb-3">Aplicaciones</h2>
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                        {formula.applications}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </Card>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-6">Comentarios</h2>
              
              <Card className="p-6 mb-6">
                <Textarea
                  placeholder="Escribe un comentario..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="mb-4"
                  data-testid="comment-input"
                />
                <Button 
                  onClick={handleSubmitComment}
                  disabled={!commentText.trim() || addCommentMutation.isPending}
                  data-testid="submit-comment"
                >
                  Publicar Comentario
                </Button>
              </Card>

              <div className="space-y-4">
                {topLevelComments.map(comment => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    replies={comments}
                    onReply={setReplyingTo}
                    onVote={(commentId, type) => voteCommentMutation.mutate({ commentId, type })}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Información</h3>
                
                {topic && (
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-1">Tema</p>
                    <Badge variant="secondary">{topic.name}</Badge>
                  </div>
                )}

                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-2">Califica esta fórmula</p>
                  <StarRating
                    rating={formula.averageRating || 0}
                    onRate={(rating) => rateFormulaMutation.mutate(rating)}
                    showCount
                    count={formula.ratingCount || 0}
                    size={24}
                  />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

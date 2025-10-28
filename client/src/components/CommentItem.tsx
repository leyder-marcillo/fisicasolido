import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ThumbsUp, ThumbsDown, Reply } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import type { Comment } from '@shared/schema';

interface CommentItemProps {
  comment: Comment;
  onReply?: (commentId: string) => void;
  onVote?: (commentId: string, type: 'up' | 'down') => void;
  replies?: Comment[];
  level?: number;
}

export function CommentItem({ comment, onReply, onVote, replies = [], level = 0 }: CommentItemProps) {
  const [showReplies, setShowReplies] = useState(true);
  const initials = comment.author.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const timeAgo = comment.createdAt 
    ? formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true, locale: es })
    : 'hace un momento';
  
  const directReplies = replies.filter(r => r.parentId === comment.id);

  return (
    <div className={level > 0 ? 'ml-12' : ''} data-testid={`comment-${comment.id}`}>
      <Card className="p-4 mb-4">
        <div className="flex gap-3">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium text-sm" data-testid="comment-author">{comment.author}</span>
              <span className="text-xs text-muted-foreground">{timeAgo}</span>
            </div>
            
            <p className="text-sm leading-relaxed mb-3" data-testid="comment-content">
              {comment.content}
            </p>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onVote?.(comment.id, 'up')}
                className="h-8 px-2 gap-1"
                data-testid="upvote-button"
              >
                <ThumbsUp className="w-4 h-4" />
                <span className="text-xs">{comment.upvotes || 0}</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onVote?.(comment.id, 'down')}
                className="h-8 px-2 gap-1"
                data-testid="downvote-button"
              >
                <ThumbsDown className="w-4 h-4" />
                <span className="text-xs">{comment.downvotes || 0}</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onReply?.(comment.id)}
                className="h-8 px-2 gap-1"
                data-testid="reply-button"
              >
                <Reply className="w-4 h-4" />
                <span className="text-xs">Responder</span>
              </Button>
            </div>
          </div>
        </div>
      </Card>
      
      {directReplies.length > 0 && showReplies && (
        <div className="space-y-4">
          {directReplies.map(reply => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onReply={onReply}
              onVote={onVote}
              replies={replies}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

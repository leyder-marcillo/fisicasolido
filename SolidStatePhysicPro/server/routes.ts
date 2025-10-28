import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertFormulaSchema, insertExerciseSchema, insertCommentSchema, insertRatingSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get('/api/topics', async (req, res) => {
    try {
      const topics = await storage.getTopics();
      res.json(topics);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch topics' });
    }
  });

  app.get('/api/topics/:id', async (req, res) => {
    try {
      const topic = await storage.getTopic(req.params.id);
      if (!topic) {
        return res.status(404).json({ error: 'Topic not found' });
      }
      res.json(topic);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch topic' });
    }
  });

  app.get('/api/formulas', async (req, res) => {
    try {
      const formulas = await storage.getFormulas();
      res.json(formulas);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch formulas' });
    }
  });

  app.get('/api/formulas/:id', async (req, res) => {
    try {
      const formula = await storage.getFormula(req.params.id);
      if (!formula) {
        return res.status(404).json({ error: 'Formula not found' });
      }
      res.json(formula);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch formula' });
    }
  });

  app.post('/api/formulas', async (req, res) => {
    try {
      const validatedData = insertFormulaSchema.parse(req.body);
      const formula = await storage.createFormula(validatedData);
      res.status(201).json(formula);
    } catch (error) {
      res.status(400).json({ error: 'Invalid formula data' });
    }
  });

  app.get('/api/exercises', async (req, res) => {
    try {
      const exercises = await storage.getExercises();
      res.json(exercises);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch exercises' });
    }
  });

  app.get('/api/exercises/:id', async (req, res) => {
    try {
      const exercise = await storage.getExercise(req.params.id);
      if (!exercise) {
        return res.status(404).json({ error: 'Exercise not found' });
      }
      res.json(exercise);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch exercise' });
    }
  });

  app.post('/api/exercises', async (req, res) => {
    try {
      const validatedData = insertExerciseSchema.parse(req.body);
      const exercise = await storage.createExercise(validatedData);
      res.status(201).json(exercise);
    } catch (error) {
      res.status(400).json({ error: 'Invalid exercise data' });
    }
  });

  app.get('/api/comments/:targetType/:targetId', async (req, res) => {
    try {
      const { targetType, targetId } = req.params;
      const comments = await storage.getComments(targetType, targetId);
      res.json(comments);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch comments' });
    }
  });

  app.get('/api/comments', async (req, res) => {
    try {
      const { targetType, targetId } = req.query;
      if (!targetType || !targetId) {
        return res.status(400).json({ error: 'Missing targetType or targetId' });
      }
      const comments = await storage.getComments(targetType as string, targetId as string);
      res.json(comments);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch comments' });
    }
  });

  app.post('/api/comments', async (req, res) => {
    try {
      const validatedData = insertCommentSchema.parse(req.body);
      const comment = await storage.createComment(validatedData);
      res.status(201).json(comment);
    } catch (error) {
      res.status(400).json({ error: 'Invalid comment data' });
    }
  });

  app.post('/api/comments/:id/vote', async (req, res) => {
    try {
      const { id } = req.params;
      const { type } = req.body;
      
      const comment = await storage.getComment(id);
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }

      const upvotes = type === 'up' ? (comment.upvotes || 0) + 1 : comment.upvotes || 0;
      const downvotes = type === 'down' ? (comment.downvotes || 0) + 1 : comment.downvotes || 0;
      
      await storage.updateCommentVotes(id, upvotes, downvotes);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to vote on comment' });
    }
  });

  app.post('/api/ratings', async (req, res) => {
    try {
      const validatedData = insertRatingSchema.parse(req.body);
      const { targetType, targetId, rating, userId } = validatedData;

      await storage.createRating(validatedData);

      const allRatings = await storage.getRatings(targetType, targetId);
      const avgRating = Math.round(
        allRatings.reduce((sum, r) => sum + r.rating, 0) / allRatings.length
      );
      const count = allRatings.length;

      if (targetType === 'formula') {
        await storage.updateFormulaRating(targetId, avgRating, count);
      } else if (targetType === 'exercise') {
        await storage.updateExerciseRating(targetId, avgRating, count);
      }

      res.status(201).json({ success: true, avgRating, count });
    } catch (error) {
      res.status(400).json({ error: 'Invalid rating data' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

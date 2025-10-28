import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const topics = pgTable("topics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
});

export const formulas = pgTable("formulas", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  latex: text("latex").notNull(),
  description: text("description").notNull(),
  derivation: text("derivation"),
  applications: text("applications"),
  topicId: varchar("topic_id").notNull(),
  difficulty: integer("difficulty").notNull().default(1),
  averageRating: integer("average_rating").default(0),
  ratingCount: integer("rating_count").default(0),
});

export const exercises = pgTable("exercises", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  problemStatement: text("problem_statement").notNull(),
  solution: text("solution").notNull(),
  explanation: text("explanation"),
  topicId: varchar("topic_id").notNull(),
  difficulty: integer("difficulty").notNull().default(1),
  averageRating: integer("average_rating").default(0),
  ratingCount: integer("rating_count").default(0),
});

export const comments = pgTable("comments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  content: text("content").notNull(),
  author: text("author").notNull(),
  targetType: text("target_type").notNull(),
  targetId: varchar("target_id").notNull(),
  parentId: varchar("parent_id"),
  upvotes: integer("upvotes").default(0),
  downvotes: integer("downvotes").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const ratings = pgTable("ratings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  targetType: text("target_type").notNull(),
  targetId: varchar("target_id").notNull(),
  rating: integer("rating").notNull(),
  userId: text("user_id").notNull(),
});

export const insertTopicSchema = createInsertSchema(topics).omit({ id: true });
export const insertFormulaSchema = createInsertSchema(formulas).omit({ 
  id: true, 
  averageRating: true, 
  ratingCount: true 
});
export const insertExerciseSchema = createInsertSchema(exercises).omit({ 
  id: true, 
  averageRating: true, 
  ratingCount: true 
});
export const insertCommentSchema = createInsertSchema(comments).omit({ 
  id: true, 
  createdAt: true 
});
export const insertRatingSchema = createInsertSchema(ratings).omit({ id: true });

export type Topic = typeof topics.$inferSelect;
export type Formula = typeof formulas.$inferSelect;
export type Exercise = typeof exercises.$inferSelect;
export type Comment = typeof comments.$inferSelect;
export type Rating = typeof ratings.$inferSelect;

export type InsertTopic = z.infer<typeof insertTopicSchema>;
export type InsertFormula = z.infer<typeof insertFormulaSchema>;
export type InsertExercise = z.infer<typeof insertExerciseSchema>;
export type InsertComment = z.infer<typeof insertCommentSchema>;
export type InsertRating = z.infer<typeof insertRatingSchema>;

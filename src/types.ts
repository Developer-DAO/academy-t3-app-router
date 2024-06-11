export interface CompletedQuizRecord {
  id: string;
  lessonId: string;
  userId: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

import { Category } from './category.interface';

export interface Test {
  testId?: number;
  title?: string;
  description?: string;
  maximumPoints?: number;
  numberQuestionnaires?: number;
  state?: boolean;
  category?: Category;
}

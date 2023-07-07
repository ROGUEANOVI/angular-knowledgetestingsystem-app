import { Test } from './test.interface';

export interface Questionary {
  questionaryId?: number;
  ask: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer: string;
  selectedAnswer?: string;
  image: string;
  test: Test;
}

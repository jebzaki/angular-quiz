export enum QuizType {
  boolean = 'boolean',
  multiple = 'multiple',
}

export function getQuizTypeValue(key: string | null | undefined): QuizType | undefined {
  if (key == null) {
    return undefined;
  }

  return QuizType[key as keyof typeof QuizType];
}

export type QuizTypeLabelType = { [key in QuizType]: string };

export const QuizTypeLabel: QuizTypeLabelType = {
  [QuizType.boolean]: 'True / False',
  [QuizType.multiple]: 'Multiple Choice',
};

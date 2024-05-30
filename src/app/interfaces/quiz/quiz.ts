import { Question } from "../question/question";

export interface Quiz {
  response_code: number,
  results: Question[]
}
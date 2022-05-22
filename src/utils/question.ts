import { UserProps } from './userStore'

export type FirebaseQuestions = Record<string, QuestionProps>

export interface QuestionProps {
  content: string
  author: {
    name: string
    avatar: string
  }
  numOfLikes: number
  isHighlighted: false
  isAnswered: false
}

export interface ParsedQuestionProps extends QuestionProps {
  id: string
}

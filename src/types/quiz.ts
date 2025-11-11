export interface QuestionBank {
  id: number
  text: string
  options: Option[]
  correct: string[] // indices of correct answers
  explanation: string
  multi?: boolean // if true, render as multi-select
  tag?: string // topic tag
}

export interface Answers {
  [questionId: number]: string[] // array of selected option ids
}

export interface Option {
  id: string
  text: string
}

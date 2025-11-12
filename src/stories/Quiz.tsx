import {
  QuestionCard,
  QuestionNavigator,
  QuizHeader,
  QuizNavigation,
  QuizResults,
} from '@/index'
import { answers, questions } from './data/quiz'

import '@/styles'

type Theme = 'light' | 'dark'
type QuizComponentName =
  | 'ALL'
  | 'QuizHeader'
  | 'QuestionNavigator'
  | 'QuestionCard'
  | 'QuizNavigation'
  | 'QuizResults'
export interface QuizProps {
  theme: Theme
  quizComponentName: QuizComponentName
}

export const Quiz = ({ theme, quizComponentName }: QuizProps) => {
  const isShowAllComponents = quizComponentName === 'ALL'
  const tags = ['ALL', 'Theory', 'Practical']
  const filterTag = tags[0]
  const currrentIndex = 0
  const totalQuestions = 1
  const submitted = false

  const handleAction = () => {
    throw new Error('Function not implemented.')
  }

  return (
    <div className="min-h-screen p-4">
      <div className={`max-w-4xl mx-auto snackact-ui-theme-${theme}`}>
        {(isShowAllComponents || quizComponentName === 'QuizHeader') && (
          <QuizHeader
            timer={0}
            currentIndex={currrentIndex}
            totalQuestions={totalQuestions}
            submitted={submitted}
            score={1}
            progress={0}
            onReset={handleAction}
            onToggleNavigator={handleAction}
          />
        )}
        {(isShowAllComponents || quizComponentName === 'QuestionNavigator') && (
          <QuestionNavigator
            questions={questions}
            currentIndex={currrentIndex}
            submitted={submitted}
            answers={answers}
            tags={tags}
            filterTag={filterTag}
            onFilterChange={handleAction}
            onJumpToQuestion={handleAction}
            getQuestionStatus={handleAction}
          />
        )}
        {(isShowAllComponents || quizComponentName === 'QuestionCard') && (
          <QuestionCard
            question={questions[0]}
            answers={answers}
            submitted={submitted}
            isCorrect={true}
            onAnswer={handleAction}
          />
        )}

        {(isShowAllComponents || quizComponentName === 'QuizNavigation') && (
          <QuizNavigation
            currentIndex={currrentIndex}
            totalQuestions={totalQuestions}
            submitted={submitted}
            onPrevious={handleAction}
            onNext={handleAction}
            onSubmit={handleAction}
          />
        )}

        {(isShowAllComponents || quizComponentName === 'QuizResults') && (
          <QuizResults
            timer={0}
            questions={questions}
            answers={answers}
            score={1}
            isCorrect={() => true}
          />
        )}
      </div>
    </div>
  )
}

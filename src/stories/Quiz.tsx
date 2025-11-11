import { QuestionNavigator, QuizHeader } from '@/index'
import '@/styles'
import { answers, questions } from './data/quiz'

export const Quiz = () => {
  const handleReset = () => {
    throw new Error('Function not implemented.')
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto snackact-ui-dark-theme">
        <QuizHeader
          timer={0}
          currentIndex={0}
          totalQuestions={5}
          submitted={false}
          score={1}
          progress={0}
          onReset={handleReset}
          onToggleNavigator={() => {}}
        />
        <QuestionNavigator
          questions={questions}
          currentIndex={0}
          submitted={false}
          answers={answers}
          tags={['ALL', 'Theory', 'Practical']}
          filterTag={'ALL'}
          onFilterChange={() => {}}
          onJumpToQuestion={() => {}}
          getQuestionStatus={() => 'unanswered'}
        />
      </div>
    </div>
  )
}

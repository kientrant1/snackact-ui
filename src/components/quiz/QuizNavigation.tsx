import { Button } from '@/components/ui/Button'

interface QuizNavigationProps {
  currentIndex: number
  totalQuestions: number
  submitted: boolean
  onPrevious: () => void
  onNext: () => void
  onSubmit: () => void
}

export function QuizNavigation({
  currentIndex,
  totalQuestions,
  submitted,
  onPrevious,
  onNext,
  onSubmit,
}: QuizNavigationProps) {
  return (
    <div className="mt-4 flex justify-between">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentIndex === 0}
      >
        Previous
      </Button>
      <div className="flex gap-2">
        {!submitted && (
          <Button variant="default" onClick={onSubmit}>
            Submit Quiz
          </Button>
        )}
        <Button
          variant="default"
          onClick={onNext}
          disabled={currentIndex === totalQuestions - 1}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

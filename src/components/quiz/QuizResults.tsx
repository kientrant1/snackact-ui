import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Separator } from '@/components/ui/Separator'
import { motion } from 'framer-motion'
import type { Answers, QuestionBank } from '@/types/quiz'

interface QuizResultsProps {
  timer: number
  questions: QuestionBank[]
  answers: Answers
  score: number
  isCorrect: (qId: number) => boolean
}

export function QuizResults({
  timer,
  questions,
  answers,
  score,
  isCorrect,
}: QuizResultsProps) {
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const correctCount = questions.filter(q => isCorrect(q.id)).length
  const incorrectCount = questions.filter(
    q => !isCorrect(q.id) && (answers[q.id] || []).length > 0
  ).length
  const skippedCount = questions.filter(
    q => (answers[q.id] || []).length === 0
  ).length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4"
    >
      <Card>
        <CardHeader>
          <CardTitle>Quiz Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-green-500">
                {correctCount}
              </p>
              <p className="text-sm text-muted-foreground">Correct</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-500">
                {incorrectCount}
              </p>
              <p className="text-sm text-muted-foreground">Incorrect</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-muted-foreground">
                {skippedCount}
              </p>
              <p className="text-sm text-muted-foreground">Skipped</p>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="text-center">
            <p className="text-lg font-semibold">
              Final Score:{' '}
              <span
                className={
                  score >= 85
                    ? 'text-green-500'
                    : score >= 70
                      ? 'text-yellow-500'
                      : 'text-red-500'
                }
              >
                {score}%
              </span>
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Time: {formatTime(timer)}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {score >= 85
                ? "Excellent! You're well-prepared."
                : score >= 70
                  ? 'Good job! Review incorrect answers.'
                  : 'Keep practicing! Review the Scrum Guide.'}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

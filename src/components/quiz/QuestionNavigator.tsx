import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { ScrollArea } from '@/components/ui/ScrollArea'
import { motion } from 'framer-motion'
import type { Answers, QuestionBank } from '@/types/quiz'

interface QuestionNavigatorProps {
  questions: QuestionBank[]
  currentIndex: number
  submitted: boolean
  answers: Answers
  tags: string[]
  filterTag: string
  onFilterChange: (tag: string) => void
  onJumpToQuestion: (index: number) => void
  getQuestionStatus: (
    qId: number
  ) => 'answered' | 'unanswered' | 'correct' | 'incorrect'
}

export function QuestionNavigator({
  questions,
  currentIndex,
  submitted,
  tags,
  filterTag,
  onFilterChange,
  onJumpToQuestion,
  getQuestionStatus,
}: QuestionNavigatorProps) {
  const filteredQuestions = filterTag
    ? questions.filter(q => q.tag === filterTag)
    : questions

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Question Navigator</CardTitle>
          <div className="flex gap-2 flex-wrap mt-2">
            <Button
              size="sm"
              variant={filterTag === '' ? 'default' : 'outline'}
              onClick={() => onFilterChange('')}
            >
              All
            </Button>
            {tags.map(tag => (
              <Button
                key={tag}
                size="sm"
                variant={filterTag === tag ? 'default' : 'outline'}
                onClick={() => onFilterChange(tag)}
              >
                {tag}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-48">
            <div className="grid grid-cols-10 gap-2">
              {filteredQuestions.map(q => {
                const actualIdx = questions.findIndex(x => x.id === q.id)
                const status = getQuestionStatus(q.id)
                return (
                  <Button
                    key={q.id}
                    variant={actualIdx === currentIndex ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onJumpToQuestion(actualIdx)}
                    className={`
                      ${status === 'correct' && submitted ? 'border-green-500' : ''}
                      ${status === 'incorrect' && submitted ? 'border-red-500' : ''}
                      ${status === 'answered' && !submitted ? 'border-blue-500' : ''}
                    `}
                  >
                    {actualIdx + 1}
                  </Button>
                )
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </motion.div>
  )
}

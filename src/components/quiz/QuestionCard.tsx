import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { RadioGroup } from '@/components/ui/RadioGroup'
import { motion } from 'framer-motion'
import { Check, X, Eye, EyeOff } from 'lucide-react'
import type { Answers, QuestionBank } from '@/types/quiz'
import { AnswerOption } from './AnswerOption'

interface QuestionCardProps {
  question: QuestionBank
  answers: Answers
  submitted: boolean
  isCorrect: boolean
  onAnswer: (optionId: string) => void
}

export function QuestionCard({
  question,
  answers,
  submitted,
  isCorrect,
  onAnswer,
}: QuestionCardProps) {
  const [showExplanation, setShowExplanation] = useState(false)
  const currentAnswers = answers[question.id] || []

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            {question.tag && (
              <Badge variant="outline" className="mb-2">
                {question.tag}
              </Badge>
            )}
            <CardTitle className="text-lg leading-relaxed">
              {question.text}
            </CardTitle>
          </div>
          {submitted && (
            <div className="ml-4">
              {isCorrect ? (
                <Check className="h-6 w-6 text-green-500" />
              ) : (
                <X className="h-6 w-6 text-red-500" />
              )}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {question.multi ? (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground mb-3">
              Select all that apply
            </p>
            {question.options.map((option, idx) => (
              <AnswerOption
                key={idx}
                option={option}
                isMulti={true}
                isSelected={currentAnswers.includes(option.id)}
                isCorrect={question.correct.includes(option.id)}
                submitted={submitted}
                onSelect={() => onAnswer(option.id)}
              />
            ))}
          </div>
        ) : (
          <RadioGroup
            value={currentAnswers[0]?.toString()}
            onValueChange={value => onAnswer(value)}
            disabled={submitted}
          >
            {question.options.map((option, idx) => (
              <AnswerOption
                key={idx}
                option={option}
                isMulti={false}
                isSelected={currentAnswers.includes(option.id)}
                isCorrect={question.correct.includes(option.id)}
                submitted={submitted}
                onSelect={() => !submitted && onAnswer(option.id)}
              />
            ))}
          </RadioGroup>
        )}

        {submitted && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4"
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowExplanation(!showExplanation)}
              className="w-full"
            >
              {showExplanation ? (
                <EyeOff className="h-4 w-4 mr-2" />
              ) : (
                <Eye className="h-4 w-4 mr-2" />
              )}
              {showExplanation ? 'Hide' : 'Show'} Explanation
            </Button>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-3 p-3 bg-muted rounded-lg"
              >
                <p className="text-sm">{question.explanation}</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}

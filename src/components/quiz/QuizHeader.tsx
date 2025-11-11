import { Clock, RotateCcw, ListChecks } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Progress } from '@/components/ui/Progress'

interface QuizHeaderProps {
  timer: number
  currentIndex: number
  totalQuestions: number
  submitted: boolean
  score: number
  progress: number
  onReset: () => void
  onToggleNavigator: () => void
}

export function QuizHeader({
  timer,
  currentIndex,
  totalQuestions,
  submitted,
  score,
  progress,
  onReset,
  onToggleNavigator,
}: QuizHeaderProps) {
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">
              Scrum Master Certification Practice
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              80 questions based on the 2020 Scrum Guide
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={onToggleNavigator}>
              <ListChecks className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={onReset}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{formatTime(timer)}</span>
            </div>
            <span>
              Question {currentIndex + 1} of {totalQuestions}
            </span>
          </div>
          {submitted && (
            <Badge
              variant={
                score >= 85
                  ? 'default'
                  : score >= 70
                    ? 'secondary'
                    : 'destructive'
              }
            >
              Score: {score}%
            </Badge>
          )}
        </div>
        <Progress value={progress} className="mt-2" />
      </CardContent>
    </Card>
  )
}

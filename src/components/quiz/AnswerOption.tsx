import { Checkbox } from '@/components/ui/Checkbox'
import { RadioGroupItem } from '@/components/ui/RadioGroup'
import type { Option } from '@/types/quiz'

interface AnswerOptionProps {
  option: Option
  isMulti: boolean
  isSelected: boolean
  isCorrect: boolean
  submitted: boolean
  onSelect: () => void
}

export function AnswerOption({
  option,
  isMulti,
  isSelected,
  isCorrect,
  submitted,
  onSelect,
}: AnswerOptionProps) {
  return (
    <div
      className={`
        flex items-start space-x-3 p-3 rounded-lg border cursor-pointer transition-colors
        ${isSelected ? 'border-primary bg-primary/5' : 'border-border'}
        ${submitted && isCorrect ? 'border-green-500 bg-green-500/5' : ''}
        ${submitted && isSelected && !isCorrect ? 'border-red-500 bg-red-500/5' : ''}
      `}
      data-value={option.id}
      onClick={onSelect}
    >
      {isMulti ? (
        <Checkbox
          checked={isSelected}
          disabled={submitted}
          className="mt-0.5"
        />
      ) : (
        <RadioGroupItem value={option.id} className="mt-0.5" />
      )}
      <label className="flex-1 cursor-pointer">{option.text}</label>
    </div>
  )
}

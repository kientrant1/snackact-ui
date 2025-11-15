import type { IconProps } from '@/types/component'

export default function PlusIcon({
  className = 'w-6 h-6',
  testId,
  ...props
}: IconProps) {
  return (
    <svg
      className={className}
      data-testid={testId}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4v16m8-8H4"
      />
    </svg>
  )
}

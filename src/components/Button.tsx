interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
}) => {
  const baseClasses =
    'px-4 py-2 rounded-lg font-medium transition-colors duration-200'
  const variantClasses =
    variant === 'primary'
      ? 'bg-blue-600 hover:bg-blue-700 text-white'
      : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer'

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${disabledClasses}`}
    >
      {children}
    </button>
  )
}

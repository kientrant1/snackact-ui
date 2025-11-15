import {
  ChevronDownIcon,
  CloseIcon,
  DeleteIcon,
  ExportIcon,
  GitHubIcon,
  GoogleIcon,
  ImportIcon,
  InfoIcon,
  LogoutIcon,
  OwlIcon,
  PlusIcon,
  RemoveIcon,
  SearchIcon,
  SearchNotFoundIcon,
  WarningIcon,
} from '@/icons'
import { cn } from '@/index'

import '@/styles'

type Theme = 'light' | 'dark'
export interface IconProps {
  theme: Theme
}

export const Icon = ({ theme }: IconProps) => {
  const icons = [
    { component: ChevronDownIcon, name: 'ChevronDown' },
    { component: CloseIcon, name: 'Close' },
    { component: DeleteIcon, name: 'Delete' },
    { component: ExportIcon, name: 'Export' },
    { component: GitHubIcon, name: 'GitHub' },
    { component: GoogleIcon, name: 'Google' },
    { component: ImportIcon, name: 'Import' },
    { component: InfoIcon, name: 'Info' },
    { component: LogoutIcon, name: 'Logout' },
    {
      component: OwlIcon,
      name: 'Owl',
      className: 'w-18 h-18',
      eyePosition: { x: 0, y: 5 },
      eyesClosed: false,
    },
    { component: PlusIcon, name: 'Plus' },
    { component: RemoveIcon, name: 'Remove' },
    { component: SearchIcon, name: 'Search' },
    { component: SearchNotFoundIcon, name: 'SearchNotFound' },
    { component: WarningIcon, name: 'Warning' },
  ]

  return (
    <div className={`snackact-ui-theme-${theme}`}>
      <div
        className={cn(
          'p-8 grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-8',
          {
            'bg-[#1a1a1a]': theme === 'dark',
            'bg-white': theme === 'light',
          }
        )}
      >
        {icons.map(
          ({ component: IconComponent, name, className, ...props }) => (
            <div
              key={name}
              className={cn(
                'flex flex-col items-center p-4 rounded-lg border',
                {
                  'border-[#333] bg-[#2a2a2a]': theme === 'dark',
                  'border-gray-200 bg-gray-50': theme === 'light',
                }
              )}
            >
              <div className="mb-2 text-2xl">
                <IconComponent className={className} {...props} />
              </div>
              <span
                className={cn('text-xs font-medium text-center', {
                  'text-gray-400': theme === 'dark',
                  'text-gray-600': theme === 'light',
                })}
              >
                {name}
              </span>
            </div>
          )
        )}
      </div>
    </div>
  )
}

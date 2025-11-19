import { ToastEditor as SnackUIToastEditor } from '@/index'
import type { ToastEditorProps } from '@/index'

type Theme = 'light' | 'dark'

export interface EditorProps {
  theme: Theme
  options?: ToastEditorProps['options']
}

export const ToastEditor = ({ theme, options }: EditorProps) => {
  return (
    <div className={`snackact-ui-theme-${theme}`}>
      <SnackUIToastEditor options={options} />
    </div>
  )
}

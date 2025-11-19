// https://github.com/nhn/tui.editor/tree/master/apps/react-editor

import { Editor, type EditorProps } from '@toast-ui/react-editor'
import type { ComponentProps } from '@/types/component'

import '@toast-ui/editor/dist/toastui-editor.css'

export interface ToastEditorProps extends ComponentProps {
  options?: EditorProps
}

export const ToastEditor = ({ options }: ToastEditorProps) => {
  const editorOptions = {
    initialValue: 'This is Toast Editor!',
    previewStyle: 'vertical',
    height: '600px',
    initialEditType: 'markdown',
    useCommandShortcut: true,
    ...options,
  }
  return <Editor {...editorOptions} />
}

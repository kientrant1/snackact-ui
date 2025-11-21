import { LoginForm } from '@/index'

type Theme = 'light' | 'dark'

export interface EditorProps {
  theme: Theme
}

export const Authentication = ({ theme }: EditorProps) => {
  const handleSocialLogin = (provider: 'google' | 'github') => {
    alert(`Login with ${provider}`)
  }

  const handleSubmit = async (data: unknown) => {
    alert(`Submit triggered ${data}`)
  }

  const handleSignUp = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    alert('Sign Up clicked')
  }

  return (
    <div className={`snackact-ui-theme-${theme}`}>
      <LoginForm
        onSocialLogin={handleSocialLogin}
        onSignUp={handleSignUp}
        onSubmit={handleSubmit}
      />{' '}
    </div>
  )
}

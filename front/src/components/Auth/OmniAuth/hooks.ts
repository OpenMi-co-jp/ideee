type SignInProps = {
  provider: 'google_oauth2' | 'twitter'
}

export const handleSignIn = ({ provider }: SignInProps) => {
  provider
  const form = document.createElement('form')
  form.method = 'POST'
  const url = process.env.NEXT_PUBLIC_API_URL + `users/auth/${provider}`
  form.action = url

  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form)
}

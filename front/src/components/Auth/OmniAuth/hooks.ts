type SignInProps = {
  provider: 'google_oauth2' | 'twitter'
  authenticity_token: string
}

export const handleSignIn = ({ provider, authenticity_token }: SignInProps) => {
  const form = document.createElement('form')
  const input = document.createElement('input')

  form.method = 'POST'
  const url = process.env.NEXT_PUBLIC_API_URL + `users/auth/${provider}`
  form.action = url

  input.type = 'hidden'
  input.name = 'authenticity_token'
  input.value = authenticity_token
  form.appendChild(input)

  document.body.appendChild(form)
  form.submit()
  setTimeout(() => document.body.removeChild(form), 0)
}

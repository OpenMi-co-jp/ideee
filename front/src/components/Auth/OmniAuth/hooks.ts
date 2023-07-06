import { showSuccess, showError } from '@/components/notifications'
import { googleLogin } from '@/utils/auth'

export const handleSignIn = async () => {
  // try {
  //   const response = await googleLogin()
  //   if (response.status === 200) {
  //     const token = response.headers['authorization']
  //     console.log(token)
  //     // if (token) {
  //     //   Cookies.set('authToken', String(token), {
  //     //     expires: 7,
  //     //     secure: true,
  //     //   })
  //     // }
  //     localStorage.setItem('loggedIn', 'true')
  //     showSuccess({ action: 'Googleログイン' })
  //   } else {
  //     throw new Error('Request failed with status code: ' + response.status)
  //   }
  // } catch (error) {
  //   showError({ action: 'Googleログイン' })
  // }

  // try {
  //   const authWindow = window.open(
  //     process.env.NEXT_PUBLIC_API_URL + '/auth/google_oauth2', // your backend OAuth endpoint
  //     '_blank'
  //   );

  //   if (authWindow) {
  //     authWindow.focus();
  //   } else {
  //     throw new Error('Could not open new window');
  //   }
  // } catch (error) {
  //   showError({ action: 'Googleログイン' });
  // }

  const blankForm = document.createElement('form')
  blankForm.method = 'POST'
  blankForm.action = process.env.NEXT_PUBLIC_API_URL + 'auth/google_oauth2'
  blankForm.target = '_blank'

  // Append the blankForm to the body
  document.body.appendChild(blankForm)

  // Submit the blankForm
  blankForm.submit()

  // Clean up the blankForm element
  document.body.removeChild(blankForm)
}

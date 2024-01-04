// TODO: JWTのverifyメソッドを実装する
import { verify } from 'jsonwebtoken'
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

export const verifyJwt = (
  token: string,
  secret: string | undefined = JWT_SECRET_KEY
) => {
  // TODO: JWTのverifyメソッドを実装する
  const result = verify(token, secret as string, (err, decoded) => {
    if (err) {
      return JSON.stringify(`Error: ${err.message}`)
    } else if (!decoded) {
      return JSON.stringify(decoded)
    }
  })
  return result
}

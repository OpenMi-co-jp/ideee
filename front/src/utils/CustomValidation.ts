import { z } from 'zod'

export const base64ImageValidation = (message: string) =>
  z
    .string()
    .optional()
    .nullable()
    .refine(
      (data) => {
        if (typeof data === 'undefined' || data === null) {
          return true
        }
        const base64Regex =
          /^data:image\/[a-zA-Z]+;base64,[A-Za-z0-9+/]+={0,2}$/
        return base64Regex.test(String(data))
      },
      { message }
    )

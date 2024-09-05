import { z } from 'zod'

export const TeamFormSchema = z.object({
  requirement: z
    .string()
    .max(255, { message: '得られるものは255文字以内で入力してください' }),
  offer: z
    .string()
    .max(255, { message: 'お願いすることは255文字以内で入力してください' }),
})

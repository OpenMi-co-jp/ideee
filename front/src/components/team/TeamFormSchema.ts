import { z } from 'zod'

export const TeamFormSchema = z.object({
  requirement: z.string().refine(
    (value) => {
      const lines = value.split('\n')
      return lines.length <= 8
    },
    {
      message: '得られるものは8行以内で入力してください。',
    }
  ),
  offer: z.string().refine(
    (value) => {
      const lines = value.split('\n')
      return lines.length <= 8
    },
    {
      message: '得られるものは8行以内で入力してください',
    }
  ),
})

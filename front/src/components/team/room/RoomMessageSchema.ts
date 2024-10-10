import { z } from 'zod'

export const RoomMessageSchema = z.object({
  roomMessage: z.string().min(1, { message: 'メッセージを入力してください' }),
})

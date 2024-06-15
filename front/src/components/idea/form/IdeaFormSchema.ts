import { z } from 'zod'
import { base64ImageValidation } from '@/utils/CustomValidation'

export const IdeaFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: '名前を入力してください' })
    .max(50, { message: '名前は50文字以内で入力してください' }),
  background: z
    .string()
    .min(1, { message: '背景を入力してください' })
    .max(255, { message: '背景は255文字以内で入力してください' }),
  goal: z
    .string()
    .min(1, { message: 'ゴールを入力してください' })
    .max(255, { message: 'ゴールは255文字以内で入力してください' }),
  issue: z
    .string()
    .max(255, { message: 'ユーザーの課題は255文字以内で入力してください' })
    .nullish(),
  hypothesis: z
    .string()
    .max(255, { message: '仮説は255文字以内で入力してください' })
    .nullish(),
  monetize: z
    .string()
    .max(255, { message: '収益化方法は255文字以内で入力してください' })
    .nullish(),
  similar: z
    .string()
    .max(255, { message: '類似製品は255文字以内で入力してください' })
    .nullish(),
  stance: z
    .enum(['free_right', 'personal_project', 'team_project'])
    .nullish()
    .refine((data) => data !== null, {
      message: 'スタンスを選択してください',
    }),
  target: z
    .string()
    .max(255, { message: 'ターゲットは255文字以内で入力してください' })
    .nullish(),
  wishFunction: z
    .string()
    .max(255, { message: '希望機能は255文字以内で入力してください' })
    .nullish(),
  githubUrl: z
    .string()
    .url({ message: 'URLの形式で入力してください' })
    .optional()
    .or(z.literal(''))
    .nullable(),
  productUrl: z
    .string()
    .url({ message: 'URLの形式で入力してください' })
    .optional()
    .or(z.literal(''))
    .nullable(),
  publish: z.boolean().nullish(),
  icon: base64ImageValidation(
    '登録できない画像形式です。別の形式でもう一度お試しください。'
  ),
  tagList: z
    .array(
      z.string().max(20, { message: 'タグは20文字以内で入力してください' })
    )
    .nonempty({ message: '1つ以上のタグを設定してください' })
    .refine((tags) => tags.every((tag) => !/\s/.test(tag)), {
      message: 'タグにはスペースを含めないでください',
    }),
})

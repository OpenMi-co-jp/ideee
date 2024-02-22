import { UseCreateIdea } from './hooks'
import { IdeaBaseForm } from '@/components/idea/form/BaseForm'

export const CreateForm = () => {
  const { form, onSubmit } = UseCreateIdea()

  return <IdeaBaseForm title="アイデア作成" form={form} onSubmit={onSubmit} />
}

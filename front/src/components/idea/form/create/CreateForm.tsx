import { UseCreateIdea } from './hooks'
import { IdeaBaseForm } from '@/components/idea/form/BaseForm'

export const CreateForm = () => {
  const { form, onSubmit } = UseCreateIdea()

  return <IdeaBaseForm type="create" form={form} onSubmit={onSubmit} />
}

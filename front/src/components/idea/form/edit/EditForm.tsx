import { UseEditIdea } from './hooks'
import { IdeaBaseForm } from '@/components/idea/form/BaseForm'

export const EditForm = () => {
  const { form, onSubmit } = UseEditIdea()

  return <IdeaBaseForm type="update" form={form} onSubmit={onSubmit} />
}

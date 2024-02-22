import { UseEditIdea } from './hooks'
import { IdeaBaseForm } from '@/components/idea/form/BaseForm'

export const EditForm = () => {
  const { form, onSubmit } = UseEditIdea()

  return <IdeaBaseForm title="アイデア編集" form={form} onSubmit={onSubmit} />
}

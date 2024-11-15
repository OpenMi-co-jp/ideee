import {
  Radio,
  Group,
  Paper,
  Title,
  rem,
  Accordion,
  Button,
  Center,
  getGradient,
  Container,
  Stack,
} from '@mantine/core'
import { IconBulb, IconBrandGithub, IconApps } from '@tabler/icons-react'
import {
  TextForm,
  TextAreaForm,
  TagsForm,
  DropzoneForm,
  SwitchForm,
} from '@/components/ReactFormSet'
import {
  UseFormReturn,
  Controller,
  FieldValues,
  SubmitHandler,
  useWatch,
} from 'react-hook-form'
import { IdeaImage } from '@/components/image'
import { useState } from 'react'
import { useFormState } from 'react-hook-form'
import { useGetTagsQuery } from '@/lib/generated/client'

type IdeaFormProps = {
  type: 'create' | 'update'
  form: UseFormReturn<any>
  onSubmit: SubmitHandler<FieldValues>
}

export const IdeaBaseForm = ({ type, form, onSubmit }: IdeaFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    await form.handleSubmit(onSubmit)(event)
    setIsSubmitting(false)
  }
  const { isValid } = useFormState({ control: form.control })
  const isPublish = useWatch({
    control: form.control,
    name: 'publish',
  })

  const { loading, data } = useGetTagsQuery()
  const tags: string[] =
    loading || !data?.tags ? [] : data.tags.map((tag) => tag.name)
  return (
    <Container size="sm">
      <Paper py={rem(40)}>
        <Title order={2} mb={30} fw={500} ta="center">
          アイデア{type === 'create' ? '作成' : '編集'}
        </Title>
        <form onSubmit={handleSubmit} role="form">
          <DropzoneForm
            form={form}
            name="icon"
            existingImagePath="iconUrl"
            ImageComponent={IdeaImage}
          />
          <Paper bg="#FCFCFC" radius="md" p="lg">
            <Stack gap="lg">
              <TextForm form={form} name="name" label="アイデア名" required />

              <TagsForm
                form={form}
                name="tagList"
                label="タグ"
                suggestions={tags}
                required
              />

              <TextAreaForm
                form={form}
                name="background"
                label="背景"
                required
              />
              <TextAreaForm form={form} name="goal" label="ゴール" required />

              <Accordion
                variant="separated"
                chevronPosition="left"
                styles={(theme) => ({
                  control: {
                    background: getGradient(
                      {
                        deg: 45,
                        from: theme.colors.orange[1],
                        to: theme.colors.yellow[1],
                      },
                      theme
                    ),
                  },
                })}
              >
                <Accordion.Item value="bulb">
                  <Accordion.Control icon={<IconBulb size={20} />}>
                    さらにブラッシュアップする
                  </Accordion.Control>
                  <Accordion.Panel my="md">
                    <Stack>
                      <TextAreaForm
                        form={form}
                        name="issue"
                        label="ユーザーの課題"
                      />
                      <TextAreaForm
                        form={form}
                        name="wishFunction"
                        label="メイン機能"
                      />
                      <TextAreaForm
                        form={form}
                        name="hypothesis"
                        label="数値的仮説"
                      />
                      <TextAreaForm
                        form={form}
                        name="target"
                        label="ターゲット（ペルソナ）"
                      />
                      <TextAreaForm
                        form={form}
                        name="monetize"
                        label="収益化方法"
                      />
                      <TextAreaForm
                        form={form}
                        name="similar"
                        label="類似サービス"
                      />
                      <TextForm
                        form={form}
                        name="githubUrl"
                        label="GitHubのURL"
                        leftSection={<IconBrandGithub />}
                      />
                    </Stack>
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
              <TextForm
                form={form}
                name="productUrl"
                label="サービスのURL"
                leftSection={<IconApps />}
              />

              <Controller
                name={'stance'}
                control={form.control}
                render={({ field }) => {
                  return (
                    <Radio.Group
                      label="スタンス"
                      description="チーム開発の場合、アイデアがより注目されます"
                      {...field}
                      error={form.formState.errors['stance']?.message as string}
                      withAsterisk
                    >
                      <Group mt="xs">
                        <Radio value="free_right" label="アイデア権フリー" />
                        <Radio value="personal_project" label="個人開発中" />
                        <Radio value="team_project" label="チーム開発募集" />
                      </Group>
                    </Radio.Group>
                  )
                }}
              />
              {(type === 'create' || !form.getValues('publish')) && (
                <SwitchForm
                  form={form}
                  name="publish"
                  label="公開ステータス"
                  mt="xl"
                  onLabel="公開"
                  offLabel="下書き"
                />
              )}
            </Stack>
          </Paper>
          <Center>
            <Button
              type="submit"
              my={30}
              size="lg"
              variant="gradient"
              gradient={{ from: 'yellow', to: 'orange' }}
              disabled={isSubmitting || !isValid}
            >
              {isPublish ? '作成' : '下書き保存'}
            </Button>
          </Center>
        </form>
      </Paper>
    </Container>
  )
}

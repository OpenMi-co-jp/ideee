import {
  Image,
  Radio,
  Group,
  Paper,
  Title,
  rem,
  Accordion,
  Grid,
  Button,
  Center,
  getGradient,
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
} from 'react-hook-form'
import { IdeaImage } from '@/components/image'

type IdeaFormProps = {
  title: 'アイデア作成' | 'アイデア編集'
  form: UseFormReturn<any>
  onSubmit: SubmitHandler<FieldValues>
}

export const IdeaBaseForm = ({ title, form, onSubmit }: IdeaFormProps) => {
  return (
    <Paper p={rem(40)}>
      <Title order={2} mb={30} fw={500} ta="center">
        {title}
      </Title>
      <Grid grow>
        <Grid.Col
          span="content"
          style={{
            flexFlow: 'column',
            alignItems: 'center',
          }}
        >
          <form onSubmit={form.handleSubmit(onSubmit)} role="form">
            <DropzoneForm
              form={form}
              name="icon"
              existingImagePath="iconUrl"
              ImageComponent={IdeaImage}
            />
            <Paper bg="#FCFCFC" radius="md" p="xl">
              <TextForm
                form={form}
                name="name"
                label="アイデア名"
                required
                my="lg"
              />
              <TagsForm form={form} name="tagList" label="タグ" required />
              <TextAreaForm
                form={form}
                name="background"
                label="背景"
                required
                my="lg"
              />
              <TextAreaForm
                form={form}
                name="goal"
                label="ゴール"
                required
                my="lg"
              />
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
                  <Accordion.Panel m="md">
                    <TextAreaForm
                      form={form}
                      name="issue"
                      label="ユーザーの課題"
                      my="lg"
                    />
                    <TextAreaForm
                      form={form}
                      name="wishFunction"
                      label="メイン機能"
                      my="lg"
                    />
                    <TextAreaForm
                      form={form}
                      name="hypothesis"
                      label="数値的仮説"
                      my="lg"
                    />
                    <TextAreaForm
                      form={form}
                      name="target"
                      label="ターゲット（ペルソナ）"
                      my="lg"
                    />
                    <TextAreaForm
                      form={form}
                      name="monetize"
                      label="収益化方法"
                      my="lg"
                    />
                    <TextAreaForm
                      form={form}
                      name="similar"
                      label="類似サービス"
                      my="lg"
                    />
                    <TextForm
                      form={form}
                      name="githubUrl"
                      label="GitHubのURL"
                      my="lg"
                      leftSection={<IconBrandGithub />}
                    />
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
              <TextForm
                form={form}
                name="productUrl"
                label="サービスのURL"
                my="lg"
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
              {!form.getValues('publish') && (
                <SwitchForm
                  form={form}
                  name="publish"
                  label="公開する"
                  mt="xl"
                  onLabel="公開"
                  offLabel="下書き"
                />
              )}
            </Paper>
            <Center>
              <Button
                type="submit"
                my={30}
                size="lg"
                variant="gradient"
                gradient={{ from: 'yellow', to: 'orange' }}
              >
                保存
              </Button>
            </Center>
          </form>
        </Grid.Col>
      </Grid>
    </Paper>
  )
}

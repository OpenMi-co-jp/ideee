import {
  Button,
  Paper,
  Title,
  Grid,
  Text,
  Checkbox,
  rem,
  Center,
} from '@mantine/core'
import { TextForm, TextAreaForm, DropzoneForm } from '@/components/ReactFormSet'
import {
  IconUpload,
  IconBrandX,
  IconBrandGithub,
  IconLink,
} from '@tabler/icons-react'
import { UpdateUser } from './hooks'
import { useEffect } from 'react'

export const Form = () => {
  const { form, onSubmit, error, loading } = UpdateUser()

  const isEngineer = form.watch('isEngineer')
  const isIdeaMan = form.watch('isIdeaMan')

  const calculateDefinitionValue = (
    isEngineer: boolean,
    isIdeaMan: boolean
  ) => {
    if (isEngineer && isIdeaMan) return 'idea_engineer'
    if (isIdeaMan) return 'idea_man'
    if (isEngineer) return 'engineer'
    return null
  }

  useEffect(() => {
    const definitionValue = calculateDefinitionValue(isEngineer, isIdeaMan)
    form.setValue('definition', definitionValue)
  }, [isEngineer, isIdeaMan, form])

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Paper
        m="lg"
        p={rem(40)}
        shadow="md"
        style={{ backgroundColor: '#F2F2F2' }}
      >
        <Title order={2} mb={30} fw={500} ta="center">
          ユーザー情報編集
        </Title>
        <Grid grow>
          <Grid.Col
            span={2}
            style={{
              display: 'flex',
              flexFlow: 'column',
              alignItems: 'center',
            }}
          >
            <DropzoneForm
              form={form}
              name="icon"
              fetchName="image"
              label="ユーザーアイコン"
            />
          </Grid.Col>
          <Grid.Col span={7}>
            <TextForm
              form={form}
              name="name"
              label="ユーザー名"
              required
              my="lg"
            />
            <TextAreaForm
              form={form}
              name="description"
              label="自己紹介"
              my="lg"
            />
          </Grid.Col>
        </Grid>
        <Grid id="my-grid" justify="center" pt={40} grow>
          <Grid.Col
            span={6}
            style={{
              display: 'flex',
              flexFlow: 'column',
              alignItems: 'center',
            }}
          >
            <Checkbox label="エンジニア" {...form.register('isEngineer')} />
          </Grid.Col>
          <Grid.Col
            span={6}
            style={{
              display: 'flex',
              flexFlow: 'column',
              alignItems: 'center',
            }}
          >
            <Checkbox label="アイデアマン" {...form.register('isIdeaMan')} />
          </Grid.Col>
          <Grid.Col span={12}>
            <Center>
              {form.formState.errors.definition?.message && (
                <Text color="red" size="sm">
                  {String(form.formState.errors.definition.message)}
                </Text>
              )}
            </Center>
          </Grid.Col>
        </Grid>

        <Grid grow>
          <Grid.Col span={{ md: 4 }}>
            <TextForm
              form={form}
              name="twitterId"
              label="Twitter ID"
              my="lg"
              leftSection={<IconBrandX size={20} />}
            />
          </Grid.Col>
          <Grid.Col span={{ md: 4 }}>
            <TextForm
              form={form}
              name="githubId"
              label="GitHub"
              my="lg"
              leftSection={<IconBrandGithub size={20} />}
            />
          </Grid.Col>
          <Grid.Col span={{ md: 4 }}>
            <TextForm
              form={form}
              name="siteUrl"
              label="サイトURL"
              my="lg"
              leftSection={<IconLink size={20} />}
            />
          </Grid.Col>
        </Grid>
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
  )
}

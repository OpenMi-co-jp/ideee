import {
  Button,
  Paper,
  Title,
  Grid,
  Text,
  Checkbox,
  Image,
  FileInput,
  rem,
  Center,
} from '@mantine/core'
import { TextForm, TextAreaForm } from '@/components/ReactFormSet'
import {
  IconUpload,
  IconBrandX,
  IconBrandGithub,
  IconLink,
} from '@tabler/icons-react'
import { UpdateUser } from './hooks'

export const Form = () => {
  const iconRef = '/img/undefined_user_icon.webp'
  const { form, onSubmit, error, loading } = UpdateUser()

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
            <Image
              height={150}
              width={150}
              radius={50}
              maw={150}
              mah={150}
              src={iconRef}
              alt="user prof"
            />
            <FileInput
              placeholder="画像をアップロード"
              label="ユーザーアイコン"
              radius="md"
              mt="xl"
              leftSection={<IconUpload size={14} />}
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
            <Text fz="md" pb={20} size="xl">
              エンジニア
            </Text>
            <Checkbox color="orange" size="lg" label="🛠" />
          </Grid.Col>
          <Grid.Col
            span={6}
            style={{
              display: 'flex',
              flexFlow: 'column',
              alignItems: 'center',
            }}
          >
            <Text fz="md" pb={20} size="xl">
              アイデアマン
            </Text>
            <Checkbox color="orange" size="lg" label="💡" />
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

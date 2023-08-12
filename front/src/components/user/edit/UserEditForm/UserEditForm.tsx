import React from 'react'
import {
  Card,
  Button,
  Col,
  Paper,
  Title,
  Grid,
  Text,
  Checkbox,
  Image,
  FileInput,
  rem,
  Group,
} from '@mantine/core'
import { TextForm, TextAreaForm } from '@/components/ReactFormSet'
import { useForm } from 'react-hook-form'
import {
  IconUpload,
  IconBrandTwitter,
  IconBrandGithub,
  IconLink,
} from '@tabler/icons-react'

type UserEditFormValues = {
  name: String
  email: String
  twitterId: string
  githubId: string
  siteUrl: string
  profile: string
}

export const UserEditForm = () => {
  const iconRef = '/img/undefined_user_icon.webp'
  const form = useForm<UserEditFormValues>({
    defaultValues: {},
    mode: 'onChange',
  })

  const onSubmit = () => {
    console.log('-------submit------')
  }
  return (
    <>
      <Image
        src="/img/edit-form-header.webp"
        fit="scale-down"
        alt="user edit header img"
      />
      <Card padding="xl" style={{ backgroundColor: '#fff' }}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Paper
            m="lg"
            p={rem(40)}
            shadow="md"
            style={{ backgroundColor: '#F2F2F2' }}
          >
            <Title order={2} mb={30} weight={500} align="center">
              ユーザー情報編集
            </Title>
            <Grid grow>
              <Grid.Col
                span="content"
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
                  src={iconRef}
                  alt="user prof"
                />
                <FileInput
                  placeholder="画像をアップロード"
                  label="ユーザーアイコン"
                  radius="md"
                  mt="xl"
                  icon={<IconUpload size={rem(14)} />}
                />
              </Grid.Col>
              <Grid.Col md={5}>
                <TextForm
                  form={form}
                  name="name"
                  label="ユーザー名"
                  required
                  my="lg"
                />
                <TextForm
                  form={form}
                  name="email"
                  label="メールアドレス"
                  required
                  my="lg"
                />
              </Grid.Col>
            </Grid>
            <Grid id="my-grid" justify="center" pt={40} grow>
              <Col
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
              </Col>
              <Col
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
              </Col>
            </Grid>
            <TextAreaForm form={form} name="profile" label="自己紹介" my="lg" />
            <Grid grow>
              <Grid.Col md={4}>
                <TextForm
                  form={form}
                  name="twitterId"
                  label="Twitter ID"
                  my="lg"
                  icon={<IconBrandTwitter size={rem(20)} />}
                />
              </Grid.Col>
              <Grid.Col md={4}>
                <TextForm
                  form={form}
                  name="githubId"
                  label="GitHub"
                  my="lg"
                  icon={<IconBrandGithub size={rem(20)} />}
                />
              </Grid.Col>
              <Grid.Col md={4}>
                <TextForm
                  form={form}
                  name="siteUrl"
                  label="サイトURL"
                  my="lg"
                  icon={<IconLink size={rem(20)} />}
                />
              </Grid.Col>
            </Grid>
          </Paper>
          <Group position="center">
            <Button
              type="submit"
              my={30}
              size="lg"
              variant="gradient"
              gradient={{ from: 'yellow', to: 'orange' }}
            >
              登録
            </Button>
          </Group>
        </form>
      </Card>
    </>
  )
}

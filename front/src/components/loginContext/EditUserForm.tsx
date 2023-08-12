import React from 'react'
import {
  Card,
  Input,
  Button,
  Textarea,
  Col,
  Paper,
  Title,
  Grid,
  Text,
  Checkbox,
  Image,
  FileInput,
  rem,
} from '@mantine/core'
import { TextForm } from '@/components/ReactFormSet'
import { useForm } from 'react-hook-form'
import { IconUpload } from '@tabler/icons-react'

type UserEditFormValues = {
  name: string
  email: string
}

const EditUserForm = () => {
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
        <Paper
          p="xl"
          shadow="md"
          style={{
            backgroundColor: '#EFEFEF',
            paddingTop: '50px',
          }}
        >
          <form onSubmit={form.handleSubmit(onSubmit)}></form>
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
            <Grid.Col span={5}>
              <Title
                order={2}
                mb={30}
                style={{
                  textAlign: 'center',
                  fontWeight: '500',
                }}
              >
                ユーザー情報編集
              </Title>
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
          <Text fz="md" my="lg">
            自己紹介
          </Text>
          <Textarea
            style={{
              marginBottom: '20px',
            }}
          />
          <Grid grow>
            <Grid.Col span={4}>
              <Input.Wrapper id="input-twitter" label="Twitter ID">
                <Input
                  style={{
                    paddingTop: 50,
                  }}
                />
              </Input.Wrapper>
            </Grid.Col>
            <Grid.Col span={4} offset={1}>
              <Input.Wrapper id="input-github" label="GitHub">
                <Input
                  style={{
                    paddingTop: 50,
                  }}
                />
              </Input.Wrapper>
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
              <Text
                fz="md"
                pb={20}
                style={{
                  fontSize: '20px',
                }}
              >
                エンジニア
              </Text>
              <Checkbox color="orange" size="xl" label="🛠" />
            </Col>
            <Col span={6}>
              <div
                style={{
                  display: 'flex',
                  flexFlow: 'column',
                  alignItems: 'center',
                }}
              >
                <Text
                  fz="md"
                  pb={20}
                  style={{
                    fontSize: '20px',
                  }}
                >
                  アイデアマン
                </Text>
                <Checkbox color="orange" size="xl" label="💡" />
              </div>
            </Col>
          </Grid>
          <Grid gutter="md">
            <Col mt="lg">
              <Button
                type="submit"
                fullWidth
                my={40}
                size="lg"
                style={{ background: '#F4AE7B' }}
              >
                登録
              </Button>
            </Col>
          </Grid>
        </Paper>
      </Card>
    </>
  )
}

export default EditUserForm

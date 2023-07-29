import React from 'react'
import {
  Input,
  Button,
  Textarea,
  Col,
  Paper,
  Title,
  Grid,
  Text,
  Checkbox,
} from '@mantine/core'


const EditUserForm = () => {
  return (
    <>
      <Paper p="md" radius="md" shadow="md">
      </Paper>
      <Paper p="md" radius="md" shadow="md">
        <Grid grow>
          <Grid.Col span={4}>
            <div>
              <div>
                仮のアイコン画像
              </div>
              <Button type="submit" >
                Choose File
              </Button>
            </div></Grid.Col>
          <Grid.Col span={4}>
            <Title order={2} mb={30}>
              ユーザー情報編集
            </Title>
            <Input.Wrapper
              id="input-username"
              withAsterisk
              label="ユーザー名"
            >
              <Input
              />
            </Input.Wrapper>
            <Input.Wrapper
              id="input-email"
              withAsterisk
              label="メールアドレス"
            >
              <Input
              />
            </Input.Wrapper>
          </Grid.Col>
        </Grid>
        <Textarea
          label="自己紹介"
        />
        <Grid grow>
          <Grid.Col span={4}>
            <Input.Wrapper
              id="input-twitter"
              label="Twitter"
            >
              <Input
              />
            </Input.Wrapper></Grid.Col>
          <Grid.Col span={4}>
            <Input.Wrapper
              id="input-github"
              label="GitHub"
            >
              <Input
              />
            </Input.Wrapper></Grid.Col>
        </Grid>
        <Grid id="my-grid">
          <Col span={4}>
            <div>
              <Text fz="md">アイデアマン/エンジニア</Text>
              <Checkbox />
            </div>
          </Col>
          <Col span={4}>
            <div>
              <Text fz="md">アイデアマン</Text>
              <Checkbox />
            </div>
          </Col>
          <Col span={4}>
            <div>
              <Text fz="md">エンジニア</Text>
              <Checkbox />
            </div>
          </Col>
        </Grid>
        <Grid gutter="md">
          <Col style={{ marginTop: '1rem' }}>
            <Button type="submit" >
              送信
            </Button>
          </Col>
        </Grid>
      </Paper>
    </>
  )
}

export default EditUserForm
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
  Image,
} from '@mantine/core'
import { EditUserFromWrapper } from './EditUserForm.style'

const EditUserForm = () => {
  return (
    <>
      <EditUserFromWrapper >
        <Image
          height={198}
          width={1235}
          src="/img/edit-form-header.webp"
          alt="edit form header"
        />
        <Paper p="xl" shadow="md" 
          style={{
            width:1136,
            height:1210,
            backgroundColor:'#D9D9D9'}}>
          <Grid grow>
            <Grid.Col span={4}>
              <div>
                <Image
                  height={310}
                  width={310}
                  radius={50}
                  src="/img/user-prof.webp"
                  alt="user prof"
                />
                <Button type="submit" >
                  Choose File
                </Button>
              </div>
            </Grid.Col>
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
          <div>
            <Text fz="md">自己紹介</Text>
            <Textarea />
          </div>
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
      </EditUserFromWrapper>
    </>
  )
}

export default EditUserForm
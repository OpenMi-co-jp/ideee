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
      <EditUserFromWrapper>
        <Image
          height={198}
          width={1235}
          src="/img/edit-form-header.webp"
          alt="edit form header"
        />
        <Paper
          p="xl"
          shadow="md"
          style={{
            width: 1136,
            height: 1210,
            backgroundColor: '#D9D9D9',
            paddingTop: '50px',
          }}
        >
          <Grid grow>
            <Grid.Col span="content">
              <div
                style={{
                  display: 'flex',
                  flexFlow: 'column',
                  alignItems: 'center',
                }}
              >
                <Image
                  height={310}
                  width={310}
                  radius={50}
                  src="/img/user-prof.webp"
                  alt="user prof"
                />
                <Button
                  type="submit"
                  style={{
                    fontSize: '20px',
                    width: '160px',
                    height: '35px',
                    flexShrink: 0,
                    marginTop: '1rem',
                    fontWeight: 500,
                    color: '#000000',
                    border: '1px solid #000',
                    background: '#C2C2C2',
                  }}
                >
                  Choose File
                </Button>
              </div>
            </Grid.Col>
            <Grid.Col span={5}>
              <Title
                order={2}
                mb={30}
                style={{
                  textAlign: 'center',
                  fontSize: '36px',
                  fontWeight: '500',
                }}
              >
                ユーザー情報編集
              </Title>
              <Input.Wrapper
                id="input-username"
                withAsterisk
                label="ユーザー名"
              >
                <Input
                  style={{
                    paddingTop: 50,
                  }}
                />
              </Input.Wrapper>
              <Input.Wrapper
                id="input-email"
                withAsterisk
                label="メールアドレス"
                style={{
                  paddingTop: 10,
                }}
              >
                <Input
                  style={{
                    paddingTop: 50,
                  }}
                />
              </Input.Wrapper>
            </Grid.Col>
          </Grid>
          <div>
            <Text
              fz="md"
              style={{
                textAlign: 'center',
                fontSize: '20px',
                marginTop: 30,
                marginBottom: 20,
              }}
            >
              自己紹介
            </Text>
            <Textarea
              style={{
                marginBottom: '20px',
              }}
            />
          </div>
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
          <Grid
            id="my-grid"
            style={{
              paddingTop: 55,
            }}
          >
            <Col span={4}>
              <div
                style={{
                  display: 'flex',
                  flexFlow: 'column',
                  alignItems: 'center',
                }}
              >
                <Text
                  fz="md"
                  style={{
                    textAlign: 'center',
                    fontSize: '20px',
                    paddingBottom: 25,
                  }}
                >
                  アイデアマン/エンジニア
                </Text>
                <Checkbox color="orange" size="xl" />
              </div>
            </Col>
            <Col span={4}>
              <div
                style={{
                  display: 'flex',
                  flexFlow: 'column',
                  alignItems: 'center',
                }}
              >
                <Text
                  fz="md"
                  style={{
                    textAlign: 'center',
                    fontSize: '20px',
                    paddingBottom: 25,
                  }}
                >
                  アイデアマン
                </Text>
                <Checkbox color="orange" size="xl" />
              </div>
            </Col>
            <Col span={4}>
              <div
                style={{
                  display: 'flex',
                  flexFlow: 'column',
                  alignItems: 'center',
                }}
              >
                <Text
                  fz="md"
                  style={{
                    textAlign: 'center',
                    fontSize: '20px',
                    paddingBottom: 25,
                  }}
                >
                  エンジニア
                </Text>
                <Checkbox color="orange" size="xl" />
              </div>
            </Col>
          </Grid>
          <Grid gutter="md">
            <Col
              style={{
                marginTop: '1rem',
                textAlign: 'center',
              }}
            >
              <Button
                type="submit"
                style={{
                  height: 60,
                  width: 230,
                  border: '1px solid #EE8D8D',
                  background: '#F4AE7B',
                  borderRadius: '20px',
                  color: '#FFF',
                  textAlign: 'center',
                  fontFamily: 'Inter',
                  fontSize: '40px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: 'normal',
                  marginTop: 150,
                }}
              >
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

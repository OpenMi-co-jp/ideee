import {
  Image,
  Stack,
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
import { TextForm, TextAreaForm } from '@/components/ReactFormSet'
import { UseEditIdea } from './hooks'

export const EditForm = () => {
  const { form, onSubmit } = UseEditIdea()

  return (
    <Paper p={rem(40)}>
      <Title order={2} mb={30} fw={500} ta="center">
        アイデア編集
      </Title>
      <Grid grow>
        <Grid.Col
          span="content"
          style={{
            // display: 'flex',
            flexFlow: 'column',
            alignItems: 'center',
          }}
        >
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Paper bg="#FCFCFC" radius="md" p="xl">
              <TextForm
                form={form}
                name="name"
                label="アイデア名"
                required
                my="lg"
              />
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
              {/* <Accordion variant="separated" chevronPosition="left"> */}
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
                      label="問題点"
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

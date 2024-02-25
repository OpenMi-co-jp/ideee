import { Accordion, Container, Flex, Title } from '@mantine/core'
import { MailSettingForm } from './MailSettingForm'

export const UserSettingsForm = () => {
  return (
    <Container size="sm">
      <Flex direction="column" gap="lg">
        <Title ta="center">ユーザー設定</Title>
        <Accordion variant="separated">
          <Accordion.Item value="reset-password">
            <Accordion.Control>メール設定</Accordion.Control>
            <Accordion.Panel>
              <MailSettingForm />
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Flex>
    </Container>
  )
}

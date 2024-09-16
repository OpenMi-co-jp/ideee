import { useCurrentUser } from '@/context/CurrentUserContext'
import { useGetTeamQuery } from '@/lib/generated/client'
import { getUserType } from '@/utils/getUserType'
import { Box, Button, Container, Flex, Group, Text, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconUsers } from '@tabler/icons-react'
import { useParams } from 'next/navigation'
import TeamDeleteModal from './TeamDeleteModal'
import { TextAreaForm } from '@/components/ReactFormSet'
import { useTeamMutation } from '@/components/idea/show/form/hook'

const TeamDetailEdit = () => {
  const id = useParams()?.id as string
  const { currentUser } = useCurrentUser()
  const { data } = useGetTeamQuery({
    variables: {
      id,
    },
  })
  const { team } = data || {}
  const userType = getUserType(team?.owner.definition!)
  const [opened, { open, close }] = useDisclosure(false)
  const { form, onSubmit } = useTeamMutation()
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await form.handleSubmit(onSubmit)(event)
  }

  return (
    <Container>
      <Box>
        <Group align="center" mb="xl">
          <IconUsers size={30} stroke={2} color="orange" />
          <Title order={2}>
            <Text
              fw={900}
              variant="gradient"
              gradient={{ from: 'orange', to: 'yellow' }}
              inherit
            >
              チーム編集
            </Text>
          </Title>
        </Group>
      </Box>
      <Flex align="cener" justify="end">
        {currentUser?.id === team?.ownerId && (
          <Button color="orange.6" radius="xl" onClick={open}>
            チーム削除
          </Button>
        )}
      </Flex>
      <TeamDeleteModal opened={opened} onClose={close} />
      <Box mx="sm">
        <form onSubmit={handleSubmit} role="form">
          <Title
            size="h4"
            fw={600}
            p={10}
            style={{
              borderLeft: '5px solid #FD7E13',
            }}
          >
            得られること
          </Title>
          <TextAreaForm form={form} name="offer" required mb="lg" mt="md" />
          <Title
            size="h4"
            fw={600}
            p={10}
            style={{
              borderLeft: '5px solid #FD7E13',
            }}
          >
            お願いしたいこと
          </Title>
          <TextAreaForm
            form={form}
            name="requirement"
            required
            mb="lg"
            mt="md"
          />
          <Flex justify="center" align="center" gap="xl" mt="xl">
            <Button color="orange.6" radius="xl" type="submit">
              保存
            </Button>
          </Flex>
        </form>
      </Box>
    </Container>
  )
}

export default TeamDetailEdit

import { TextAreaForm } from '@/components/ReactFormSet'
import { useUpdateTeam } from '@/components/teams/edit/hook'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { useGetTeamQuery } from '@/lib/generated/client'
import { Box, Button, Container, Flex, Group, Text, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconUsers } from '@tabler/icons-react'
import { useParams } from 'next/navigation'
import { DestroyTeamModal } from '@/components/teams/edit/destroy/DestroyTeamModal'

const TeamDetailEdit = () => {
  const id = useParams()?.id as string
  const { currentUser } = useCurrentUser()
  const { data } = useGetTeamQuery({
    variables: {
      id,
    },
  })
  const { team } = data || {}
  const [opened, { open, close }] = useDisclosure(false)
  const { form, onSubmit } = useUpdateTeam()
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
      <Flex align="center" justify="end">
        {currentUser?.id === team?.ownerId && (
          <Button color="red.6" radius="xl" onClick={open}>
            チーム開発削除
          </Button>
        )}
      </Flex>
      <DestroyTeamModal opened={opened} onClose={close} />
    </Container>
  )
}

export default TeamDetailEdit

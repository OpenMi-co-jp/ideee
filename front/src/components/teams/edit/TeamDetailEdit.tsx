import { useCurrentUser } from '@/context/CurrentUserContext'
import { useGetTeamQuery } from '@/lib/generated/client'
import { getUserType } from '@/utils/getUserType'
import { Box, Button, Container, Flex, Group, Text, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconUsers } from '@tabler/icons-react'
import { useParams } from 'next/navigation'
import TeamDeleteModal from './TeamDeleteModal'

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
        <Text p={6} mb="xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
          explicabo, vitae, expedita iusto soluta molestias saepe error
          assumenda ut quidem, quis autem id doloremque. Perspiciatis aspernatur
          magni officia quasi culpa.
        </Text>
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
        <Text p={6} mb="xl">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum,
          velit! Cum nam, atque blanditiis rem fugiat asperiores sed sit
          voluptatem, excepturi quod quaerat? Doloribus, dolore. Consectetur
          autem nemo aliquam labore.
        </Text>
      </Box>

      <Flex justify="center" align="center" gap="xl" mt="xl">
        <Button color="orange.6" radius="xl">
          保存
        </Button>
      </Flex>
    </Container>
  )
}

export default TeamDetailEdit

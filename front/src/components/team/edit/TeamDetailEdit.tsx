import { TextAreaForm } from '@/components/ReactFormSet'
import { useUpdateTeam } from '@/components/team/edit/hook'
import { useGetTeamQuery } from '@/lib/generated/client'
import { Box, Button, Container, Flex, Group, Text, Title } from '@mantine/core'
import { IconUsers } from '@tabler/icons-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const TeamDetailEdit = () => {
  const id = useParams()?.id as string
  const { data } = useGetTeamQuery({
    variables: {
      id,
    },
  })
  const { team } = data || {}
  const { form, onSubmit } = useUpdateTeam()

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
        <form onSubmit={form.handleSubmit(onSubmit)} role="form">
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
            <Link href={`/teams/${team?.id}`}>
              <Button color="gray.6" radius="xl">
                戻る
              </Button>
            </Link>
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

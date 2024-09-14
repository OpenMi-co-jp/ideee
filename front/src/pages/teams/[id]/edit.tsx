import { Box, Container, Group, Title, Text, Flex, Button } from '@mantine/core'
import { IconUsers } from '@tabler/icons-react'
import Link from 'next/link'

export default function TeamsEdit() {
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

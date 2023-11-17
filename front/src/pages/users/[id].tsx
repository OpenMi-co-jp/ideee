import UserDescription from '@/components/user/show/description'
import UserIconComponent from '@/components/user/show/iconComponent'
import { Box, Container, Divider, Group } from '@mantine/core'
import { useRouter } from 'next/router'
import { useGetUserQuery } from '@/lib/generated/client'
import { UserProvider } from '@/context/userProfileContext'
import { LoaderBox } from '@/components/features/LoaderBox'
import { AlertError } from '@/components/alert/error'
import UserName from '@/components/user/show/name'
import LinkComponent from '@/components/user/show/LinkComponent'

export default function UserProfile() {

  const router = useRouter()
  const { id } = router.query
  const { data, loading, error } = useGetUserQuery({
    variables: {
      id: id as string,
    },
  })
  if (loading) return <LoaderBox />
  if (error) return <AlertError />

  return (
    <UserProvider user={data?.user}>
      <Box w="100%" miw="15rem" p="lg" bg="" style={{ borderRadius: '0.5rem' }}>
        <Group>
          <UserIconComponent />
          <Box>
            <UserName />
            <Container
              style={{ display: 'flex', flexDirection: 'row', gap: 'sm' }}
              mt="0.4rem"
            >
              <LinkComponent />
            </Container>
          </Box>
        </Group>
        <UserDescription />
        <Divider />
      </Box>
    </UserProvider>
  )
}

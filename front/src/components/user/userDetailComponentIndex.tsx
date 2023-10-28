import UserName from '@/components/user/show/name'
import GithubProfileLink from '@/components/user/link/gitHubProfileLink'
import OtherLink from '@/components/user/link/otherLink'
import TwitterProfileLink from '@/components/user/link/twitterProfileLink'
import { Box, Container, Space } from '@mantine/core'

export default function UserDetailComponentIndex() {
  return (
    <Box>
      <UserName />
      <div></div>
      <div>コントリビューション</div>
      <div>アイデアマンorエンジニア</div>

      <Container
        style={{ display: 'flex', flexDirection: 'row', gap: 'sm' }}
        mt="0.4rem"
      >
        <GithubProfileLink />
        <Space w="xs" />
        <TwitterProfileLink />
        <Space w="xs" />
        <OtherLink />
      </Container>
    </Box>
  )
}

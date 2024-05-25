import { Title, Text, Button, Box, BackgroundImage } from '@mantine/core'
import Link from 'next/link'
import { useGetUserCountQuery } from '@/lib/generated/client'

export const TopVision = () => {
  const { data, loading, error } = useGetUserCountQuery()

  if (loading) return <p>取得中...</p>

  const userCount = data?.userCount

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <BackgroundImage
        src={'/img/top_vision_image.webp'}
        h="350px"
        w="100vw"
        style={{
          position: 'absolute',
          objectFit: 'cover',
          zIndex: -300,
        }}
      />
      <Box
        w="400px"
        pt="50px"
        mr="auto"
        style={{
          textAlign: 'center',
        }}
      >
        <Box
          pb="55px"
          style={{
            display: 'flex',
            flexFlow: 'column',
          }}
        >
          <Title
            c="#FF862F"
            fz={{ base: '32px', md: '34px' }}
            style={{
              textShadow:
                '8px 8px 12px white, -8px 8px 12px white, 8px -8px 12px white, -8px -8px 12px white',
            }}
          >
            あなたのアイデアを
          </Title>
          <Title
            c="#FF862F"
            fz={{ base: '32px', md: '34px' }}
            style={{
              textShadow:
                '8px 8px 12px white, -8px 8px 12px white, 8px -8px 12px white, -8px -8px 12px white',
            }}
          >
            エンジニアと盛り上げる
          </Title>
        </Box>
        <Link href="/about">
          <Button
            variant="gradient"
            gradient={{ from: 'orange', to: 'yellow' }}
          >
            ideeeについて｜⇢
          </Button>
        </Link>
        <Text c="#818181" pt="30px" fz="20px" fw="bold">
          現在のユーザー数:{' '}
          <b style={{ color: '#FF862F', fontSize: '2rem' }}>
            {userCount !== undefined ? userCount : '-'}
          </b>
          人
        </Text>
      </Box>
    </div>
  )
}

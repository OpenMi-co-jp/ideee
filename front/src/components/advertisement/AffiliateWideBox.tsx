import { Image, Text, Box, Flex } from '@mantine/core'
import Link from 'next/link'
import { useBreakPoint } from '@/utils/hooks/useBreakPoint'
import { AdList } from '@/utils/adLinks'

export const AffiliateWideBox = () => {
  const { isMobile } = useBreakPoint()
  const displayItems = AdList
  const shuffledItems = [...displayItems].sort(() => 0.5 - Math.random())
  const item = isMobile ? shuffledItems.slice(0, 1) : shuffledItems.slice(0, 2)

  return (
    <Flex maw={700} mx="auto" direction={isMobile ? 'column' : 'row'} gap="xl">
      {item.map((item, index) => (
        <Link
          key={index}
          href={item.link}
          target="_blank"
          rel="nofollow"
          style={{ textDecoration: 'none', flex: 1 }}
        >
          <Box my="md">
            <Text size="xs" c="gray" style={{ textAlign: 'center' }} p="xs">
              広告
            </Text>
            <Image
              src={item.source}
              alt={item.description}
              radius="sm"
              fit="contain"
              width="100%"
              height={250}
              style={{ cursor: 'pointer' }}
            />
          </Box>
          {item.metric && (
            <img
              src={item.metric}
              alt=""
              width="1"
              height="1"
              style={{ display: 'none' }}
            />
          )}
        </Link>
      ))}
    </Flex>
  )
}

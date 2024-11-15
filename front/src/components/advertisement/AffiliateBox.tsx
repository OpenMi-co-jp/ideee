import { Image, Text, Box } from '@mantine/core'
import Link from 'next/link'
import { useEffect } from 'react'
import { AdList } from '@/utils/adLinks'

export const AffiliateBox = () => {
  // ランダムにコンテンツを選択
  const displayItems = AdList
  const item = displayItems[Math.floor(Math.random() * displayItems.length)]

  useEffect(() => {
    if (item.metric) {
      const img = document.createElement('img')
      img.src = item.metric
    }
  }, [item.metric])

  return (
    <Box w={300} mx="auto">
      <Link
        href={item.link}
        target="_blank"
        rel="nofollow"
        style={{ textDecoration: 'none' }}
      >
        <Box my="sm">
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
      </Link>
      {item.metric && (
        <img
          src={item.metric}
          alt=""
          width="1"
          height="1"
          style={{ display: 'none' }}
        />
      )}
    </Box>
  )
}

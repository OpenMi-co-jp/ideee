import { Image, Text, Box } from '@mantine/core'
import Link from 'next/link'
import { useEffect } from 'react'

interface DisplayContent {
  link: string
  source: string
  description: string
  metric?: string
}

const displayItems: DisplayContent[] = [
  {
    link: 'https://px.a8.net/svt/ejp?a8mat=3ZFRUU+CDCA1M+5GUO+601S1',
    source:
      'https://www24.a8.net/svt/bgt?aid=240921030748&wid=002&eno=01&mid=s00000025512001008000&mc=1',
    description: 'A8広告',
    metric: 'https://www15.a8.net/0.gif?a8mat=3ZFRUU+CDCA1M+5GUO+601S1',
  },
  {
    link: 'https://px.a8.net/svt/ejp?a8mat=3ZFRUU+CDCA1M+5GUO+60H7L',
    source:
      'https://www21.a8.net/svt/bgt?aid=240921030748&wid=002&eno=01&mid=s00000025512001010000&mc=1',
    description: 'A8広告',
    metric: 'https://www16.a8.net/0.gif?a8mat=3ZFRUU+CDCA1M+5GUO+60H7L',
  },
  {
    link: 'https://px.a8.net/svt/ejp?a8mat=3ZFRUU+CDCA1M+5GUO+614CX',
    source:
      'https://www24.a8.net/svt/bgt?aid=240921030748&wid=002&eno=01&mid=s00000025512001013000&mc=1',
    description: 'A8広告',
    metric: 'https://www10.a8.net/0.gif?a8mat=3ZFRUU+CDCA1M+5GUO+614CX',
  },
  {
    link: 'https://px.a8.net/svt/ejp?a8mat=3ZFRUU+CDCA1M+5GUO+61C2P',
    source:
      'https://www23.a8.net/svt/bgt?aid=240921030748&wid=002&eno=01&mid=s00000025512001014000&mc=1',
    description: 'A8広告',
    metric: 'https://www11.a8.net/0.gif?a8mat=3ZFRUU+CDCA1M+5GUO+61C2P',
  },
  {
    link: 'https://px.a8.net/svt/ejp?a8mat=3ZFRUU+CDCA1M+5GUO+62U35',
    source:
      'https://www27.a8.net/svt/bgt?aid=240921030748&wid=002&eno=01&mid=s00000025512001021000&mc=1',
    description: 'A8広告',
    metric: 'https://www12.a8.net/0.gif?a8mat=3ZFRUU+CDCA1M+5GUO+62U35',
  },
]

export const AffiliateBox = () => {
  // ランダムにコンテンツを選択
  // const content = affiliateContents[Math.floor(Math.random() * affiliateContents.length)]
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

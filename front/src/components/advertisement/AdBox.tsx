import { Image, Text, Box } from '@mantine/core'
import Link from 'next/link'

export const AdBox = () => {
  return (
    <Link
      href="https://sentry.ichizoku.io?utm_source=ideee&utm_medium=advertisement&utm_campaign=sentry_blog&utm_content=banner"
      target="_blank"
    >
      <Box my="sm">
        <Text c="gray" style={{ textAlign: 'center' }} p="xs">
          Sentry Japanテックブログ
        </Text>
        <Image
          src="https://res.cloudinary.com/dnltqdyfu/image/upload/v1727753951/public/advertisement/sentry_blog.png"
          alt="Sentry Japan画像"
          radius="sm"
          fit="contain"
          width={300}
          style={{ cursor: 'pointer' }}
        />
      </Box>
    </Link>
  )
}

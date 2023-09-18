import { Autocomplete, Container } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import { PopularTags } from '@/components/features'
import { useRouter } from 'next/router'

export default function Search() {
  const router = useRouter()
  const query = router.query

  return (
    <Container>
      <Autocomplete
        data={[]}
        size="md"
        placeholder="アイデアを検索"
        icon={<IconSearch size={18} />}
        styles={{
          root: { flexGrow: 2 },
          input: {
            border: 0,
            backgroundColor: 'transparent',
            borderBottom: 'solid gray',
          },
        }}
        onChange={(value) => {
          // eslint-disable-next-line no-console
          console.log(value)
        }}
      />
      {Object.keys(query).length ? null : <PopularTags />}
    </Container>
  )
}

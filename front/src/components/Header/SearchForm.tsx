import { Autocomplete } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import type { FC } from 'react'

export const SearchForm: FC = () => {
  return (
    <Autocomplete
      data={[]}
      size="md"
      placeholder="アイデアを検索"
      icon={<IconSearch size={18} />}
      styles={{
        root: { flexGrow: 2 },
        input: { border: 0, backgroundColor: 'transparent', borderBottom: 'solid gray' },
      }}
      onChange={(value) => {
        // eslint-disable-next-line no-console
        console.log(value)
      }}
    />
  )
}

import { IconSearch } from '@tabler/icons-react'
import Link from 'next/link'

export const SearchIcon = () => {
  return (
    <Link href="/search" passHref>
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <IconSearch size={25} />
      </span>
    </Link>
  )
}

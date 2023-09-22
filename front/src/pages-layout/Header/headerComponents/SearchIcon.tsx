import { IconSearch } from '@tabler/icons-react'
import Link from 'next/link'

export const SearchIcon = () => {
  return (
    <Link href="/search" passHref>
      <IconSearch />
    </Link>
  )
}

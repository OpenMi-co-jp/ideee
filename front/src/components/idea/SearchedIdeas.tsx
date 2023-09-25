import { Loader, Paper, Text, Divider } from '@mantine/core'
import { useGetIdeasQuery } from '@/lib/generated/client'
import { IdeaList } from '@/components/idea'
import { AlertError } from '@/components/alert'
import { IconSearch } from '@tabler/icons-react'

type SearchProps = {
  query: { nameOrIdeaTagsNameCont?: string }
}

export const SearchedIdeas: React.FC<SearchProps> = ({ query }) => {
  const { loading, data, error } = useGetIdeasQuery({
    variables: { searchCondition: query },
  })
  if (loading) return <Loader color="yellow" />
  if (error) return <AlertError />
  const { nameOrIdeaTagsNameCont } = query

  return (
    <>
      <Divider
        my="xl"
        variant="dashed"
        labelPosition="center"
        label={
          <>
            <IconSearch size={12} />
            <Text ml="xs" color="gray">
              Search results
            </Text>
          </>
        }
      />
      <Paper shadow="md" py="lg" my="xl">
        <IdeaList ideas={data?.ideas.nodes} />
      </Paper>
    </>
  )
}

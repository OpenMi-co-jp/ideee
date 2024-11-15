import { useGetAiIdeasQuery } from '@/lib/generated/client'
import { LoaderBox } from '../features'
import { AlertError } from '../alert'
import { AiIdeaTitle } from './aiIdeaTitle'
import { Grid } from '@mantine/core'
import { GetAiIdeasQuery } from '@/lib/generated/client'
import Link from 'next/link'

export const AiIdeaTitleList = () => {
  const { loading, data, error } = useGetAiIdeasQuery()
  if (loading) return <LoaderBox />
  if (error) return <AlertError />

  const ideas = data?.aiIdeas as GetAiIdeasQuery['aiIdeas']

  return (
    <Grid my="xl" style={{ width: '90%', margin: 'auto' }}>
      {ideas.map((idea, index: number) => (
        <Grid.Col key={index} span={{ base: 12, md: 4, lg: 4 }}>
          <Link href={`/ideas/new?name=${idea.name}`}>
            <AiIdeaTitle title={idea.name} />
          </Link>
        </Grid.Col>
      ))}
    </Grid>
  )
}

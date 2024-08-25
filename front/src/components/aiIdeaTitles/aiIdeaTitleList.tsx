import { useGetAiIdeasQuery } from '@/lib/generated/client'
import { LoaderBox } from '../features'
import { AlertError } from '../alert'
import { AiIdeaTitle } from './aiIdeaTitle'
import { Grid } from '@mantine/core'
import { GetAiIdeasQuery } from '@/lib/generated/client'

export const AiIdeaTitleList: React.FC = () => {
  const { loading, data, error } = useGetAiIdeasQuery()
  if (loading) return <LoaderBox />
  if (error) return <AlertError />

  const ideas = data?.aiIdeas as GetAiIdeasQuery['aiIdeas']

  return (
    <Grid my="xl" style={{ width: '90%', margin: 'auto' }}>
      {ideas.map((idea, index: number) => (
        <Grid.Col key={index} span={4}>
          <AiIdeaTitle title={idea.name} />
        </Grid.Col>
      ))}
    </Grid>
  )
}

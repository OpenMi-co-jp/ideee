import { useGetAiIdeaTitlesQuery } from '@/lib/generated/client'
import { LoaderBox } from '../features'
import { AlertError } from '../alert'
import { AiIdeaTitle } from './aiIdeaTitle'
import { Grid } from '@mantine/core'
import { aiIdeaTitleType } from '@/types/idea'

export const AiIdeaTitleList: React.FC = () => {
  const { loading, data, error } = useGetAiIdeaTitlesQuery()
  if (loading) return <LoaderBox />
  if (error) return <AlertError />

  const titles = data?.aiIdeaTitles || []

  return (
    <Grid my="xl" style={{ width: '90%', margin: 'auto' }}>
      {titles.map((titleObject: aiIdeaTitleType, index: number) => (
        <Grid.Col key={index} span={4}>
          <AiIdeaTitle title={titleObject.title} />
        </Grid.Col>
      ))}
    </Grid>
  )
}

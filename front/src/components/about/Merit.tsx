import { Title, Text, Center, Image, Grid, Card, Paper } from '@mantine/core'

type MeritsProps = {
  data: {
    image: {
      path: string
      alt: string
    }
    message: {
      title: string
      description: string
    }
  }
}

export const Merit = ({ data }: MeritsProps) => {
  return (
    <>
      <Grid>
        <Grid.Col span={{ sm: 12, md: 6, lg: 12 }}>
          <Center>
            <Card>
              <div
                style={{
                  width: '14rem',
                  height: '14rem',
                  borderRadius: '50%',
                  backgroundColor: '#F5D0A9',
                  position: 'relative',
                }}
              />
              <Image
                src={data.image.path}
                alt={data.image.alt}
                h="auto"
                w={220}
                fit="contain"
                style={{
                  position: 'absolute',
                }}
              />
            </Card>
          </Center>
        </Grid.Col>
        <Grid.Col span={{ sm: 12, md: 6, lg: 12 }}>
          <Paper mb="10rem" style={{ textAlign: 'center' }}>
            <Title order={3} c="#DBA901">
              {data.message.title}
            </Title>
            {convertNewlines(data.message.description)}
          </Paper>
        </Grid.Col>
      </Grid>
    </>
  )
}

function convertNewlines(text: string) {
  return text.split('\n').map((str, index, array) =>
    index === array.length - 1 ? (
      str
    ) : (
      <Text key={str}>
        {str}
        <br />
      </Text>
    )
  )
}

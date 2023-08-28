import { Anchor, Container, Paper, Text, Title } from '@mantine/core'
import Link from 'next/link'

export default function FrequentQuestion(){
    return(
        <Container >
        <Container mr='5%' ml='10%'>    
        <Title fz={26} fw={100} mt={160} mb={200}>よくある質問</Title>

        <Anchor mr='xl' ml='xl' display='-ms-grid'>
        <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSfZGyqfRpT0UgCjxPjZd3Ez30G-23veIGRoGuWHm59v9E4tpw/viewform?embedded=true" 
        height="717"
        width="85%"
        box-sizing="border-box" 
        title="Google Form">
        読み込んでいます…
        </iframe>
        </Anchor>
        </Container>
        </Container>
    )
}
import { Flex, Box, rem } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

export const ImageFrameComponent = () => {
  const isMobile = useMediaQuery(`(max-width: ${rem(600)})`)

  return (
    <Flex
      style={{
        position: 'relative',
        marginTop: '0px',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      ml={isMobile ? '5px' : '-20px'}
      w="100%"
    >
      <Box
        style={{
          flex: 1,
          width: isMobile ? '330px' : '500px',
          height: isMobile ? '290px' : '445px',
          borderRadius: '50%',
          background: 'rgba(239, 213, 120, 0.49)',
          top: 0,
          left: isMobile ? '-5%' : '25px',
          position: 'relative',
          transition: 'all 0.3s',
        }}
      />
      <Box
        style={{
          flex: 1,
          width: isMobile ? '330px' : '500px',
          height: isMobile ? '290px' : '445px',
          borderRadius: '50%',
          background: 'rgba(215, 145, 145, 0.50)',
          position: 'relative',
          top: '50px',
          left: isMobile ? '-10%' : '-5px',
        }}
      />
    </Flex>
  )
}

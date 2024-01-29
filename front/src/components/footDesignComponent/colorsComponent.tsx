import { useBreackPoint } from '@/utils/hooks/useBreackPoint'
import { Flex, Box } from '@mantine/core'

export const ColorsComponent = () => {
  const { isMobile } = useBreackPoint()

  return (
    <Flex
      style={{
        position: 'relative',
        marginTop: '0px',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      ml={isMobile ? '-20px' : '5px'}
      w="100%"
    >
      <Box
        style={{
          flex: 1,
          width: isMobile ? '500px' : '330px',
          height: isMobile ? '445px' : '290px',
          borderRadius: '50%',
          background: 'rgba(239, 213, 120, 0.49)',
          top: 0,
          left: isMobile ? '25px' : '-5%',
          position: 'relative',
          transition: 'all 0.3s',
        }}
      />
      <Box
        style={{
          flex: 1,
          width: isMobile ? '500px' : '330px',
          height: isMobile ? '445px' : '290px',
          borderRadius: '50%',
          background: 'rgba(215, 145, 145, 0.50)',
          position: 'relative',
          top: '50px',
          left: isMobile ? '-5px' : '-10%',
        }}
      />
    </Flex>
  )
}

import { Flex, Box } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

export const ColorsComponent = () => {
  const smallScreen = useMediaQuery('(max-width: 767px)')
  const mediumScreen = useMediaQuery(
    '(min-width: 768px) and (max-width: 991px)'
  )
  const largeScreen = useMediaQuery('(min-width: 992px)')

  return (
    <Box pb={{ base: '190px', sm: '310px', md: '450px' }}>
      <Flex style={{ position: 'relative', marginTop: '0px' }}>
        <Box
          w={{ base: '220px', sm: '333px', md: '500px' }}
          h={{ base: '170px', sm: '290px', md: '435px' }}
          bg={'rgba(239, 213, 120, 0.49)'}
          style={{
            borderRadius: '50%',
            position: 'absolute',
            left: smallScreen
              ? '37%'
              : mediumScreen
                ? '35%'
                : largeScreen
                  ? '25%'
                  : '25%',
            transform: 'translateX(-50%)',
          }}
        />
        <Box
          w={{ base: '220px', sm: '333px', md: '500px' }}
          h={{ base: '170px', sm: '290px', md: '435px' }}
          top={{ base: '20px', sm: '30px' }}
          bg={'rgba(215, 145, 145, 0.50)'}
          style={{
            borderRadius: '50%',
            position: 'absolute',
            left: smallScreen
              ? '63%'
              : mediumScreen
                ? '65%'
                : largeScreen
                  ? '75%'
                  : '75%',
            transform: 'translateX(-50%)',
          }}
        />
      </Flex>
    </Box>
  )
}

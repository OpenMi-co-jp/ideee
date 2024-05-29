import { Box } from '@mantine/core'

export const SpeechBubble = () => {
  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#85B6F2',
        color: 'white',
        borderRadius: '15px',
        height: '45px',
        width: '60%',
        margin: 'auto',
        position: 'relative',
        fontWeight: 'bold',
      }}
    >
      前回のログイン方法
      <Box
        style={{
          position: 'absolute',
          bottom: '-10px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '0',
          height: '0',
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderTop: '10px solid #85B6F2',
        }}
      />
    </Box>
  )
}

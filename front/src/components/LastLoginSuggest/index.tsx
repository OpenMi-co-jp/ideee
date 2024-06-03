import { Box } from '@mantine/core'

type LastLoginSuggestProps = {
  lastLoginProvider: string
}

const getProviderText = (provider: string) => {
  const providerTextMap: { [key: string]: string } = {
    google: 'Google',
    twitter: 'X',
    mail: 'メール',
  }
  return providerTextMap[provider] || provider
}

export const LastLoginSuggest = ({
  lastLoginProvider,
}: LastLoginSuggestProps) => {
  const providerText = getProviderText(lastLoginProvider)
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
        width: '65%',
        margin: 'auto',
        position: 'relative',
        fontWeight: 'bold',
      }}
    >
      前回は{providerText}でログイン
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

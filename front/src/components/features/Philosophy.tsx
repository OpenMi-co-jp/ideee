import React from 'react'
import Image from 'next/image'
import { Box, Text, Title, Divider, Flex } from '@mantine/core'

const Philosophy = () => {
  return (
    <>
      <Box>
        <Title
          style={{
            fontFamily: 'Inter',
            fontSize: '25px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: 'normal',
          }}
        >
          アイデアをデザインしエンジニアの出会いを盛り上げる
        </Title>
        <Divider style={{
          border: 0,
          borderTopWidth: '0.0625rem',
          borderTopColor: '#000000',
          borderTopStyle: 'solid',
          margin: 0,
          width: '30%',
        }} />
        <Flex
          style={{
            fontFamily: 'Inter',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: 'normal',
          }}
        >
          <Text>
            <span style={{ color: '#FDB221' }} >I</span>dea
          </Text>
          <Text>
            <span style={{ color: '#FDB221' }} >D</span>esign
          </Text>
          <Text>
            <span style={{ color: '#FDB221' }} >E</span>ngineer
          </Text>
          <Text>
            <span style={{ color: '#FDB221' }} >E</span>ncounter
          </Text>
          <Text>
            <span style={{ color: '#FDB221' }} >E</span>ncourage
          </Text>
        </Flex>
        <Text
          style={{
            fontFamily: 'Inter',
            fontSize: '25px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: 'normal',
          }}
        >
          あなたの「困ってる」を形に
        </Text>
        <Text
          style={{
            fontFamily: 'Inter',
            fontSize: '25px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: 'normal',
          }}
        >
          コードで社会に貢献してみませんか？
        </Text>

        <Flex style={{ position: 'relative' }}>
          <Image
            src={'/img/people.webp'}
            alt="people"
            width={430}
            height={300}
            style={{
              margin: '0 auto',
              zIndex: 500,
              marginTop: '18vh',
            }}
          />
          <div
            style={{
              width: '500px',
              height: '435px',
              borderRadius: '50%',
              position: 'absolute',
              background: 'rgba(239, 213, 120, 0.49)',
              top: 0,
              left: 0,
            }}
          />
          <div
            style={{
              width: '500px',
              height: '435px',
              borderRadius: '50%',
              position: 'absolute',
              background: 'rgba(215, 145, 145, 0.50)',
              top: '50px',
              left: '450px',
            }}
          />
        </Flex>

      </Box>
    </>
  )
}

export default Philosophy

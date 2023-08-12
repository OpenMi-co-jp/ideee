import React from 'react'
import Image from 'next/image'
import { Box, Text, Title, Divider, Flex } from '@mantine/core'

const Philosophy = () => {
  return (
    <>
      <Box
        style={{
          padding: '50px 0',
        }}
      >
        <Title
          style={{
            fontFamily: 'Inter',
            fontSize: '32px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: 'normal',
            textAlign: 'center',
            marginBottom: '30px',
            letterSpacing: '3px',
          }}
        >
          アイデアをデザインしエンジニアの出会いを盛り上げる
        </Title>
        <Divider style={{
          border: 0,
          borderTopWidth: '0.125rem',
          borderTopColor: '#000000',
          borderTopStyle: 'solid',
          margin: '0 auto',
          paddingBottom: '50px',
          width: '55%',
        }} />
        <Flex
          justify="center"
          align="center"
          direction="row"
          wrap="wrap"
          style={{
            fontFamily: 'Inter',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: 'normal',
            paddingBottom: '50px',
            justifyContent: 'space-between',
            width: '50%',
            margin: '0 auto',
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
        <Flex
          style={{
            position: 'relative',
            marginTop: '80px',
          }}
        >
          <Flex
            justify="center"
            direction="column"
            wrap="wrap"
            style={{
              margin: '-20px auto 0 auto',
            }}
          >
            <Text
              style={{
                fontFamily: 'Inter',
                fontSize: '25px',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: 'normal',
                zIndex: 500,
                textAlign: 'center',
                paddingBottom: '5px',
                letterSpacing: '3px',
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
                zIndex: 500,
                textAlign: 'center',
                letterSpacing: '3px',
              }}
            >
              コードで社会に貢献してみませんか？
            </Text>
            <Image
              src={'/img/people.webp'}
              alt="people"
              width={430}
              height={300}
              style={{
                margin: '0 auto',
                zIndex: 500,
                marginTop: '16vh',
              }}
            />
          </Flex>
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

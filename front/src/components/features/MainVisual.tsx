import React from 'react'
import Image from 'next/image'
import { Title, Button } from '@mantine/core'

const MainVisual = () => {
  return (
    <>
      <div >
        <Image
          src={'/img/ideeemv.webp'}
          alt='MvImage'
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            maxHeight: '500px',
            zIndex: '-300',
            top: '150px'
          }}
          fill
        />
      </div>
      <div
        style={{
          width: '350px',
          paddingTop: '200px',
          paddingBottom: '220px',
          textAlign: 'center',
        }}>
        <div
          style={{
            display: 'flex',
            flexFlow: 'column',
            paddingBottom: '20px',
          }}>
          <Title
            style={{
              color: '#FF862F',
              textAlign: 'center',
              fontFamily: 'Inter',
              fontSize: '32px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: 'normal',
            }}>
            あなたのアイデアを
          </Title>
          <Title
            style={{
              color: '#FF862F',
              textAlign: 'center',
              fontFamily: 'Inter',
              fontSize: '32px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: 'normal',
            }}>
            エンジニアと盛り上げる
          </Title>
        </div>
        <Button color='orange'>IDEEEについて｜⇢</Button>
      </div>
    </>
  )
}

export default MainVisual
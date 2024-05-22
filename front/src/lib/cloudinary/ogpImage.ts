import { getCldOgImageUrl } from 'next-cloudinary'

const backImageId = 'public/ideee_tech_idea.webp'
const imageWidth = 520
const maxFontSize = 120
const maxLineLength = 12

const getOgpText = (title: string): string => {
  let formattedTitle = ''
  let currentLine = ''

  for (let i = 0; i < title.length; i++) {
    currentLine.length < maxLineLength
      ? (currentLine += title[i])
      : ((formattedTitle += (formattedTitle ? '\n' : '') + currentLine),
        (currentLine = title[i]))
  }

  return formattedTitle + (currentLine ? '\n' + currentLine : '')
}

const getFontSize = (titleLength: number): number => {
  const sizeBrackets = [
    [5, titleLength],
    [12, Math.ceil(titleLength / 2)],
    [24, Math.ceil(titleLength / 3)],
    [36, Math.ceil(titleLength / 4)],
    [48, Math.ceil(titleLength / 5)],
    [Infinity, Math.ceil(titleLength / 5.5)],
  ]

  const fontSize = Math.floor(
    imageWidth /
      (sizeBrackets.find(([max]) => titleLength <= max)?.[1] ?? titleLength)
  )
  return Math.min(fontSize, maxFontSize)
}

export const getOgpImageUrl = ({ title }: { title: string }) => {
  const formattedTitle = getOgpText(title)
  const lineCount = (formattedTitle.match(/\n/g) || [])?.length + 1
  const fontSize = getFontSize(title.length)

  return getCldOgImageUrl({
    src: backImageId,
    overlays: [
      {
        text: {
          fontFamily: 'Source Sans Pro',
          fontSize,
          fontWeight: 'bold',
          text: formattedTitle,
          alignment: 'center',
          lineSpacing: 5,
        },
        position: {
          gravity: 'center',
          y: lineCount * 10,
        },
      },
    ],
  })
}

export const defaultOgp = () => {
  const defaultOgpId = 'public/default_ogp.webp'
  return getCldOgImageUrl({
    src: defaultOgpId,
  })
}

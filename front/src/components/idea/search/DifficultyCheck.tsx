import { Radio, Group } from '@mantine/core'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const DifficultyCheck = () => {
  const router = useRouter()
  const { difficulty_eq, ...otherParams } = router.query
  const [difficulty, setDifficulty] = useState<string>('')

  useEffect(() => {
    setDifficulty(String(difficulty_eq))
  }, [difficulty_eq])

  const handleDifficultyChange = (value: string) => {
    if (value !== difficulty) {
      setDifficulty(value)
      router.replace({
        pathname: '/search',
        query: { ...otherParams, difficulty_eq: value },
      })
    }
  }

  return (
    <Radio.Group
      label="開発難易度（LEVEL）"
      value={difficulty}
      onChange={handleDifficultyChange}
      mt={'lg'}
    >
      <Group mt="xs">
        <Radio value="easy" label="かんたん" color="blue" />
        <Radio value="middle" label="ふつう" color="orange" />
        <Radio value="hard" label="むずかしい" color="red" />
      </Group>
    </Radio.Group>
  )
}

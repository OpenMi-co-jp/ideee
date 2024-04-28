import { Radio, Group } from '@mantine/core'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const StanceCheck = () => {
  const router = useRouter()
  const { stance_eq } = router.query
  const [stance, setStance] = useState<string>('')

  useEffect(() => {
    setStance(String(stance_eq) || '')
  }, [router.query])

  const handleStanceChange = (value: string) => {
    if (value !== stance) {
      setStance(value)
      router.push(`/search?stance_eq=${value}`)
    }
  }

  return (
    <Radio.Group label="スタンス" value={stance} onChange={handleStanceChange}>
      <Group mt="xs">
        <Radio value="free_right" label="アイデア権フリー" />
        <Radio value="personal_project" label="個人開発中" />
        <Radio value="team_project" label="チーム開発募集" />
      </Group>
    </Radio.Group>
  )
}

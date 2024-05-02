import { Radio, Group } from '@mantine/core'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const StanceCheck = () => {
  const router = useRouter()
  const { stance_eq, ...otherParams } = router.query
  const [stance, setStance] = useState<string>('')

  useEffect(() => {
    setStance(String(stance_eq))
  }, [stance_eq])

  const handleStanceChange = (value: string) => {
    if (value !== stance) {
      setStance(value)
      router.replace({
        pathname: '/search',
        query: { ...otherParams, stance_eq: value },
      })
    }
  }

  return (
    <Radio.Group
      label="スタンス"
      value={stance}
      onChange={handleStanceChange}
      mt={'lg'}
    >
      <Group mt="xs">
        <Radio value="free_right" label="アイデア権フリー" color="yellow" />
        <Radio value="personal_project" label="個人開発中" color="yellow" />
        <Radio value="team_project" label="チーム開発募集" color="yellow" />
      </Group>
    </Radio.Group>
  )
}

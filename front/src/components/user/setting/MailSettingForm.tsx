import { Button, Flex, Group, Switch } from '@mantine/core'
import { useState } from 'react'
import { useCurrentUser } from '@/context/CurrentUserContext'

const initalValues = [
  { id: 1, label: '項目 1' },
  { id: 2, label: '項目 2' },
  { id: 3, label: '項目 3' },
  { id: 4, label: '項目 4' },
  { id: 5, label: '項目 5' },
  { id: 6, label: '項目 6' },
  { id: 7, label: '項目 7' },
  { id: 8, label: '項目 8' },
]

export const MailSettingForm = () => {
  const [items, setItems] = useState(initalValues)
  const { currentUser } = useCurrentUser()

  return (
    <form>
      <Group p="md">
        <Flex direction="column" gap="xl">
          {items.map((item) => (
            <Switch
              key={item.id}
              label={item.label}
              name={`switch-${item.id}`}
            />
          ))}
          <Button type="submit">送信</Button>
        </Flex>
      </Group>
    </form>
  )
}

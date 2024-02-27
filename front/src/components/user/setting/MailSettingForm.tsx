import { Button, Flex, Group, Switch } from '@mantine/core'
import { useState } from 'react'
import { useCurrentUser } from '@/context/CurrentUserContext'
import { useGetNotificationConfigQuery } from '@/lib/generated/client'
import { LoaderBox } from '@/components/features'
import { AlertError } from '@/components/alert'

const contents = [
  { id: 1, label: '項目 1', checked: false },
  { id: 2, label: '項目 2', checked: false },
  { id: 3, label: '項目 3', checked: false },
  { id: 4, label: '項目 4', checked: false },
  { id: 5, label: '項目 5', checked: false },
  { id: 6, label: '項目 6', checked: false },
  { id: 7, label: '項目 7', checked: false },
  { id: 8, label: '項目 8', checked: false },
]

export const MailSettingForm = () => {
  const [items, setItems] = useState(contents)
  const { currentUser } = useCurrentUser()
  const { data, loading, error } = useGetNotificationConfigQuery({
    variables: {
      userId: currentUser?.id.toString() || '', 
    }
  })

  if (loading) return <LoaderBox />
  if (error) return <AlertError />

  console.log(data)

  const handleSwitchChange = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          return { ...item, checked: !item.checked }
        }
        return item
      })
    )
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(items)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Group p="md">
        <Flex direction="column" gap="xl">
          {items.map((item) => (
            <Switch
              key={item.id}
              label={item.label}
              name={`switch-${item.id}`}
              defaultChecked={item.checked}
              onChange={() => handleSwitchChange(item.id)}
            />
          ))}
          <Button type="submit">送信</Button>
        </Flex>
      </Group>
    </form>
  )
}

import { Button, Flex, Group, Switch } from '@mantine/core'
import { useNotificationConfig } from '@/components/user/setting/hooks'
import { LoaderBox } from '@/components/features'
import { AlertError } from '@/components/alert'

export const MailSettingForm = () => {
  const { items, handleSwitchChange, handleSubmit, loading, error } =
    useNotificationConfig()

  if (loading) return <LoaderBox />
  if (error) return <AlertError />

  return (
      <Group p="md">
        <Flex direction="column" gap="xl">
          {items.map((item) => (
            <Switch
              key={item.id}
              label={item.label}
              name={`switch-${item.id}`}
              checked={item.checked}
              onChange={() => handleSwitchChange(item.id)}
            />
          ))}
          <Button type="button" onClick={handleSubmit}>更新</Button>
        </Flex>
      </Group>
  )
}

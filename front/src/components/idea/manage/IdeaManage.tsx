import { Group } from '@mantine/core'
import type { GetIdeaQuery } from '@/lib/generated/client'
import { IdeaMenu } from './IdeaMenu'
import { Like } from './Like'
import { XShare } from './XShare'
import { UrlCopy } from './UrlCopy'

type IdeaManageProps = {
  idea?: GetIdeaQuery['idea']
}

export const IdeaManage = ({ idea }: IdeaManageProps) => {
  return (
    <Group>
      <Like />
      <XShare />
      <UrlCopy />
      <IdeaMenu />
    </Group>
  )
}

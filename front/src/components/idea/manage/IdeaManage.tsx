import { Group } from '@mantine/core'
import type { Idea } from '@/lib/generated/client'
import { IdeaMenu } from './IdeaMenu'
import { Like } from './Like'
import { XShare } from './XShare'
import { UrlCopy } from './UrlCopy'

type IdeaManageProps = {
  idea?: Idea
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

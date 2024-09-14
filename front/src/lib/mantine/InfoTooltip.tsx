import { Tooltip, TooltipProps } from '@mantine/core'
import { IconQuestionMark } from '@tabler/icons-react'

type InfoTooltipProps = {
  title: string
  tooltipProps?: Partial<TooltipProps>
}

export const InfoTooltip = (props: InfoTooltipProps) => {
  const { title, tooltipProps } = props

  return (
    <Tooltip label={title} withArrow {...tooltipProps}>
      <IconQuestionMark
        size={24}
        color="gray"
        style={{
          margin: '0 0.5rem',
          border: '1px solid #ccc',
          borderRadius: '50%',
        }}
      />
    </Tooltip>
  )
}

import { Tooltip } from '@mantine/core'

interface BaseTooltipProps {
  label: string
  children: React.ReactNode
  position?: 'top' | 'right' | 'bottom' | 'left'
  withArrow?: boolean
}

export const BaseTooltip = (props: BaseTooltipProps) => {
  const { label, children, position = 'top', withArrow = true } = props
  return (
    <Tooltip label={label} position={position} withArrow={withArrow}>
      {children}
    </Tooltip>
  )
}

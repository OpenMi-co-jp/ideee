import type { MantineStyleProps } from '@mantine/core'
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { Switch as MantineSwitch } from '@mantine/core'
import { Controller } from 'react-hook-form'

type SwitchProps<T extends FieldValues> = MantineStyleProps & {
  label?: string
  name: Path<T>
  form: UseFormReturn<T>
  required?: boolean
  disabled?: boolean
  onLabel: string
  offLabel: string
}

export const SwitchForm = <T extends FieldValues>(props: SwitchProps<T>) => {
  const { disabled, form, label, name, onLabel, offLabel, required, ...rest } =
    props
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <MantineSwitch
          {...rest}
          checked={value}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
          label={<span style={{ fontSize: 'small' }}>{label}</span>}
          labelPosition="left"
          disabled={disabled}
          size="xl"
          onLabel={onLabel}
          offLabel={offLabel}
          error={form.formState.errors[name]?.message as string | undefined}
        />
      )}
    />
  )
}

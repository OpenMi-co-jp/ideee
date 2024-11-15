import type { MantineStyleProps } from '@mantine/core'
import { Textarea as MantineTextarea } from '@mantine/core'
import type { CSSProperties } from 'react'
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { InfoTooltip } from '@/lib/mantine/InfoTooltip'

type InputTextProps<T extends FieldValues> = MantineStyleProps & {
  label?: string
  name: Path<T>
  form: UseFormReturn<T>
  style?: CSSProperties
  required?: boolean
  disabled?: boolean
  minRows?: number
  tooltipTitle?: string
  placeholder?: string
}

// react-hook-form対応済みのMantineのInputText
export const TextAreaForm = <T extends FieldValues>(
  props: InputTextProps<T>
) => {
  const {
    disabled,
    form,
    label,
    name,
    required,
    minRows,
    tooltipTitle,
    placeholder,
    style,
    ...rest
  } = props
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => {
        return (
          <MantineTextarea
            {...field}
            {...rest}
            {...{ style, label, disabled }}
            error={form.formState.errors[name]?.message as string}
            withAsterisk={required}
            placeholder={placeholder}
            autosize
            minRows={minRows ? minRows : 2}
            label={
              tooltipTitle ? (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {label}
                  {tooltipTitle && <InfoTooltip title={tooltipTitle} />}
                </div>
              ) : (
                label
              )
            }
          />
        )
      }}
    />
  )
}

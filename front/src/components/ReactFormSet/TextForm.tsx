import type { MantineStyleProps } from '@mantine/core'
import { TextInput as MantineTextInput } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import type { CSSProperties } from 'react'
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { Controller } from 'react-hook-form'

type InputTextProps<T extends FieldValues> = MantineStyleProps & {
  label?: string
  name: Path<T>
  form: UseFormReturn<T, any>
  style?: CSSProperties
  required?: boolean
  disabled?: boolean
  searchIcon?: boolean
  leftSection?: React.ReactNode
}

// react-hook-form対応済みのMantineのInputText
export const TextForm = <T extends FieldValues>(props: InputTextProps<T>) => {
  const {
    disabled,
    form,
    label,
    name,
    required,
    searchIcon,
    leftSection,
    style,
    ...rest
  } = props
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => {
        return (
          <MantineTextInput
            leftSection={searchIcon ? <IconSearch /> : leftSection || undefined}
            {...field}
            {...rest}
            {...{ style, label, disabled }}
            error={form.formState.errors[name]?.message as string | undefined}
            withAsterisk={required}
          />
        )
      }}
    />
  )
}

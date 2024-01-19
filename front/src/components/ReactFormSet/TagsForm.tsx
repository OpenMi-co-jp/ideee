import type { CSSProperties } from 'react'
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { TagsInput as MantineTagsInput } from '@mantine/core'

type TagsInputProps<T extends FieldValues> = {
  label?: string
  name: Path<T>
  form: UseFormReturn<T, any>
  style?: CSSProperties
  required?: boolean
  disabled?: boolean
  placeholder?: string
  suggestions?: string[]
  maxTags?: number
}

export const TagsForm = <T extends FieldValues>(props: TagsInputProps<T>) => {
  const {
    disabled,
    form,
    label,
    name,
    required,
    placeholder,
    style,
    suggestions,
    maxTags,
    ...rest
  } = props

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => {
        return (
          <MantineTagsInput
            {...field}
            {...rest}
            {...{ style, label, disabled, placeholder }}
            error={
              field.value?.length > (maxTags || 3)
                ? [`タグは最大${maxTags || 3}個までです`]
                : (form.formState.errors[name]?.message as string | undefined)
            }
            withAsterisk={required}
            value={field.value || []}
            onChange={(tags) => field.onChange(tags)}
            onSearchChange={(_) => {
              if (field.value?.length >= (maxTags || 3)) {
                form.setError(name, {
                  type: 'manual',
                  message: `タグは最大${maxTags || 3}個までです`,
                })
              } else {
                if (form.formState.errors[name]) {
                  form.clearErrors(name)
                }
              }
            }}
            data={suggestions}
            maxTags={maxTags || 3}
          />
        )
      }}
    />
  )
}

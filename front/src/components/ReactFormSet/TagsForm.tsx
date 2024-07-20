import type { CSSProperties } from 'react'
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { TagsInput as MantineTagsInput } from '@mantine/core'

type TagsInputProps<T extends FieldValues> = {
  label?: string
  name: Path<T>
  form: UseFormReturn<T>
  style?: CSSProperties
  required?: boolean
  isValidation?: boolean
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
    isValidation,
    placeholder,
    style,
    suggestions,
    maxTags,
    ...rest
  } = props
  const DEFAULT_MAX_TAGS = 3

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
              isValidation
                ? (form.formState.errors[name]?.message as string)
                : undefined
            }
            withAsterisk={required}
            value={field.value || []}
            onChange={(tags) => field.onChange(tags)}
            onSearchChange={(_) => {
              if (field.value?.length >= (maxTags || DEFAULT_MAX_TAGS)) {
                form.setError(name, {
                  type: 'manual',
                  message: `タグは最大${maxTags || DEFAULT_MAX_TAGS}個までです`,
                })
              } else {
                if (form.formState.errors[name]) {
                  form.clearErrors(name)
                }
              }
            }}
            data={suggestions}
            maxTags={maxTags || DEFAULT_MAX_TAGS}
          />
        )
      }}
    />
  )
}

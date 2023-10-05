// import type { MantineStyleSystemProps } from '@mantine/core'
import { Textarea as MantineTextarea } from '@mantine/core'
import type { CSSProperties } from 'react'
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { Controller } from 'react-hook-form'

// type InputTextProps<T extends FieldValues> = MantineStyleSystemProps & {
//   label?: string
//   name: Path<T>
//   form: UseFormReturn<T, any>
//   style?: CSSProperties
//   required?: boolean
//   disabled?: boolean
//   minRows?: number
// }

// react-hook-form対応済みのMantineのInputText
export const TextAreaForm = <T extends FieldValues>(
  // props: InputTextProps<T>
) => {
  // const { disabled, form, label, name, required, minRows, style, ...rest } =
  //   props
  return (
    <></>
    // <Controller
    //   name={name}
    //   control={form.control}
    //   render={({ field }) => {
    //     return (
    //       <MantineTextarea
    //         {...field}
    //         {...rest}
    //         {...{ style, label, disabled }}
    //         error={form.formState.errors[name]?.message as string | undefined}
    //         withAsterisk={required}
    //         autosize
    //         minRows={minRows ? minRows : 2}
    //       />
    //     )
    //   }}
    // />
  )
}

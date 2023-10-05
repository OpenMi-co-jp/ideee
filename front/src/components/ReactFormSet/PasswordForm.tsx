// import type { MantineStyleSystemProps } from '@mantine/core'
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { PasswordInput as MantinePasswordInput } from '@mantine/core'
import { Controller } from 'react-hook-form'

// type InputTextProps<T extends FieldValues> = MantineStyleSystemProps & {
//   label?: string
//   name: Path<T>
//   form: UseFormReturn<T, any>
//   required?: boolean
//   disabled?: boolean
// }

export const PasswordForm = <T extends FieldValues>(
  // props: InputTextProps<T>
) => {
  // const { disabled, form, label, name, required, ...rest } = props
  return (
    <></>
    // <Controller
    //   name={name}
    //   control={form.control}
    //   render={({ field }) => {
    //     return (
    //       <MantinePasswordInput
    //         {...field}
    //         {...rest}
    //         {...{ label, disabled }}
    //         error={form.formState.errors[name]?.message as string | undefined}
    //         withAsterisk={required}
    //       />
    //     )
    //   }}
    // />
  )
}

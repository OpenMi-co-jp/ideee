import { useState, useEffect, useCallback } from 'react'
import { Controller } from 'react-hook-form'
import { Center, Text, Group } from '@mantine/core'
import type {
  FieldValues,
  Path,
  UseFormReturn,
  PathValue,
} from 'react-hook-form'
import {
  Dropzone,
  IMAGE_MIME_TYPE,
  FileWithPath,
  FileRejection,
} from '@mantine/dropzone'
import '@mantine/dropzone/styles.css'
import type { CSSProperties } from 'react'
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react'
import { rem } from '@mantine/core'
import { FC } from 'react'

export type ImageComponentProps = {
  src: string
}

type DropzoneFormProps<T extends FieldValues> = {
  ImageComponent: FC<ImageComponentProps>
  name: Path<T>
  form: UseFormReturn<T, any>
  required?: boolean
  disabled?: boolean
  style?: CSSProperties
  existingImagePath?: Path<T>
}

export const DropzoneForm = <T extends FieldValues>({
  disabled,
  form,
  ImageComponent,
  name,
  style,
  existingImagePath,
  ...rest
}: DropzoneFormProps<T>) => {
  const [files, setFiles] = useState<FileWithPath[]>([])

<<<<<<< HEAD
  const imagePath = existingImagePath || name
  const existingImage = form.getValues(imagePath)
=======
  useEffect(() => {
    if (!existingImagePath) return
    const value = form.getValues(existingImagePath)
    setExistingImage(typeof value === 'string' ? value : null)
  }, [form, existingImagePath])
>>>>>>> 8ee9fe22 (fix: 不必要なconsoleの削除)

  const imageUrl =
    files.length > 0 ? URL.createObjectURL(files[0]) : existingImage
  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl)
      }
    }
  }, [imageUrl])

  const fileToBase64 = useCallback((file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }, [])

  const handleDrop = useCallback(
    async (acceptedFiles: FileWithPath[]) => {
      setFiles(acceptedFiles)
      if (acceptedFiles[0]) {
        const base64 = await fileToBase64(acceptedFiles[0])
        form.setValue(name, base64 as PathValue<T, Path<T>>)
      }
    },
    [fileToBase64, form, name]
  )

  const handleError = useCallback(
    (rejectedFiles: FileRejection[]) => {
      const message =
        rejectedFiles[0]?.errors[0]?.message ||
        'ファイルのアップロードに失敗しました。'
      form.setError(name, {
        type: 'manual',
        message: message,
      })
    },
    [form, name]
  )

  const preview = imageUrl && (
    <Center mb={10}>
      <ImageComponent src={imageUrl} />
    </Center>
  )

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ fieldState: { error } }) => (
        <div>
          {preview}
          {(form.formState.errors[name]?.message || error?.message) && (
            <Text c="red" size="sm">
              {form.formState.errors[name]?.message?.toString() ||
                error?.message?.toString() ||
                ''}
            </Text>
          )}
          <Dropzone
            {...rest}
            onDrop={handleDrop}
            onReject={handleError}
            accept={IMAGE_MIME_TYPE}
            maxSize={3 * 1024 ** 2}
            disabled={disabled}
            multiple={false}
          >
            <DropzoneUI />
          </Dropzone>
        </div>
      )}
    />
  )
}

const DropzoneUI = () => {
  return (
    <Group
      justify="center"
      gap="xl"
      style={{ pointerEvents: 'none', minHeight: 100 }}
    >
      <Dropzone.Accept>
        <IconUpload
          style={{
            width: rem(52),
            height: rem(52),
            color: 'var(--mantine-color-blue-6)',
          }}
          stroke={1.5}
        />
      </Dropzone.Accept>
      <Dropzone.Reject>
        <IconX
          style={{
            width: rem(52),
            height: rem(52),
            color: 'var(--mantine-color-red-6)',
          }}
          stroke={1.5}
        />
      </Dropzone.Reject>
      <Dropzone.Idle>
        <IconPhoto
          style={{
            width: rem(52),
            height: rem(52),
            color: 'var(--mantine-color-dimmed)',
          }}
          stroke={1.5}
        />
      </Dropzone.Idle>
      <div>
        <Text size="sm" inline style={{ textAlign: 'center' }}>
          ファイルをドロップするか、クリックして選択
        </Text>
        <Text
          size="sm"
          c="dimmed"
          inline
          mt={7}
          style={{ textAlign: 'center' }}
        >
          最大3MBまで
        </Text>
      </div>
    </Group>
  )
}

import { UserProvider } from '@/context/userProfileContext'
import { LoaderBox } from '@/components/features/LoaderBox'
import { AlertError } from '@/components/alert/error'
import { Profile, IdeaList } from '@/components/user/show'
import { Divider, Container } from '@mantine/core'
import { useGetUser } from '@/utils/hooks/useGetUser'
import { HeadBlock } from '@/pages-layout/Head'
import { useRouter } from 'next/router'
import { truncateText } from '@/utils/truncateText'
import { getOgpImageUrl } from '@/lib/cloudinary/ogpImage'
import { generateUserJsonLd } from '@/lib/seo/jsonLd'
import { useMemo } from 'react'

export default function UserProfile() {
  const { data, loading, error } = useGetUser()
  const router = useRouter()

  const userJsonLd = useMemo(() => {
    if (!data?.user) return undefined
    return generateUserJsonLd({
      id: data.user.id,
      name: data.user.name,
      description: data.user.description || undefined,
      imageUrl: data.user.image || undefined,
    })
  }, [data?.user])

  if (loading) return <LoaderBox />
  if (error) return <AlertError />
  const imageUrl = getOgpImageUrl({ title: data?.user.name as string })

  return (
    <>
      <HeadBlock
        pageTitle={data?.user.name}
        pageImg={imageUrl}
        pageDescription={truncateText(data?.user?.description || '')}
        pagePath={process.env.NEXT_PUBLIC_FRONT_URL + router.asPath}
        pageKeywords={data?.user.definition as string}
        jsonLd={userJsonLd}
      />
      <UserProvider user={data?.user}>
        <Container>
          <Profile />
          <Divider />
          <IdeaList />
        </Container>
      </UserProvider>
    </>
  )
}

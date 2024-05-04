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

export default function UserProfile() {
  const { data, loading, error } = useGetUser()
  const router = useRouter()
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

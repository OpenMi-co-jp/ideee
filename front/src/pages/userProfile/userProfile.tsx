import { Box } from '@mantine/core'
import { UserIcon } from '@/components/user/userDetails/userIcon'
import { UserName } from '@/components/user/userDetails/userName'
import { UserEmail } from '@/components/user/userDetails/userEmail'
import { UserDescription } from '@/components/user/userDetails/userDescription'
import { GithubProfileLink } from '@/components/user/link/gitHubProfileLink'
import { TwitterProfileLink } from '@/components/user/link/twitterProfileLink'
import { OtherLink } from '@/components/user/link/otherLink'


export function userDetail() {
    
    return (
        <>
           <Box>
            <UserIcon/>
            <UserName/>
            <UserEmail/>
            <UserDescription/>
            <GithubProfileLink/>
            <TwitterProfileLink/>
            <OtherLink/>
           </Box>
        </>
    )
}
import { Card, Title, Text, Center } from '@mantine/core'
import React, { useState } from 'react';

function userDetail() {
    const [uploadedImage, setUploadedImage] = useState(iconRef);
    const [submittedData, setSubmittedData] = useState(null);
        const onSubmit = (data) => {
            console.log('------submit------');
            setSubmittedData(data);
        }


    const handleFileChange = (event) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUploadedImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    }

    
    return (
<Card miw="285" w="75%">
    <Center>
    <Title>ユーザー詳細</Title>
    </Center>


    <Title>ユーザー名</Title>
    <Text>{submittedData.name}</Text>

    <Title>プロフィール</Title>
    <Text>{submittedData.profile}</Text>

     <Title>X(旧twitter)リンク</Title>
     <Text>{submittedData.twitterId}</Text>


     <Title>GitHubリンク</Title>
     <Title>{submittedData.githubId}</Title>


     <Title>サイトURL</Title>
     <Text>{submittedData.siteUrl}</Text>
</Card>
    )
}
export default userDetail
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import useThemeStore from '@/store/useThemeStore'
import { renderStars } from './movieInfo/renderStars'
import { getProfileImgUrl } from '@/api/profileImgApi'

interface ReviewContentProps {
  $darkMode: boolean
}

interface DetailReviewProps {
  nickname?: string
  rating?: string
  text: string
  userId: string
}

function DetailReview({ nickname, rating, text, userId }: DetailReviewProps) {
  const { $darkMode } = useThemeStore()

  const [userProfileIcon, setUserProfileIcon] = useState<string | null>('')
  const [gradeStar, setGradeStar] = useState<JSX.Element[] | null>(null)

  useEffect(() => {
    const stars = renderStars(rating as string)
    setGradeStar(stars)

    const getUserIcon = async () => {
      if (userId) {
        const userIcon = await getProfileImgUrl(userId)
        setUserProfileIcon(userIcon)
      }
    }

    getUserIcon()
  }, [rating])

  return (
    <DetailReviewDivWrapper>
      <Img
        src={`https://ufinqahbxsrpjbqmrvti.supabase.co/storage/v1/object/public/userImage/${userProfileIcon}`}
        alt=""
      ></Img>

      <DetailReviewDiv>
        <NameStartDiv>
          <span>{nickname}</span>
          <StarDiv>{gradeStar}</StarDiv>
        </NameStartDiv>

        <ReviewContent $darkMode={$darkMode}>{text}</ReviewContent>
      </DetailReviewDiv>
    </DetailReviewDivWrapper>
  )
}

export default DetailReview

const DetailReviewDivWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px; /* 예시로 추가한 부분 */
`

const Img = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`

const DetailReviewDiv = styled.div`
  display: flex;
  flex-direction: column;
`

const NameStartDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  gap: 10px;
`

const StarDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
`

const ReviewContent = styled.div<ReviewContentProps>`
  color: ${({ $darkMode }) => ($darkMode ? '#E0E0E0' : '#777777')};
  text-align: start;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`

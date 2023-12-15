import styled from 'styled-components'
import star from '@/assets/StarIcon.svg'
import like from '@/assets/HeartIcon.svg'
import { FontProps } from './CategoryComponent'
import useThemeStore from '../store/useThemeStore'
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

const supabase = createClient(
  `${import.meta.env.VITE_SUPABASE_URL}`,
  `${import.meta.env.VITE_SUPABASE_KEY}`
)

interface PaddingProps {
  $padding?: string
}

interface TextColorProps {
  $darkMode: boolean
}

function FeedComponent() {
  const { $darkMode } = useThemeStore()
  const [reviews, setReviews] = useState<ReviewData>([])
  // const [reviewImg, setReviewImg] = useState<any>()

  useEffect(() => {
    const loadReviewData = async () => {
      try {
        const { data, error } = await supabase.from('reviews').select()
        if (error) throw new Error()

        setReviews(data)
      } catch (err) {
        console.error('데이터 불러오기 실패')
        return null
      }
    }

    loadReviewData()
  }, [])
  // console.log(reviews)

  const reviewImage =
    'https://image.tmdb.org/t/p/original/318YNPBDdt4VU1nsJDdImGc8Gek.jpg'

  // const storageImage = async () => {
  //   const data = await supabase.storage.from('movieImage')

  //   const publicUrl = supabase.storage.from('movieImage').getPublicUrl('*')
  //   setReviewImg(publicUrl)
  //   return publicUrl
  // }

  return (
    <FeedSection>
      <FeedContent>
        <ContentWrapper>
          {reviews?.map(item => (
            <FeedContentSection key={item.id}>
              <CommonDivWrapper $padding="10px">
                <UserImage src="" alt="" />
                <TextColor $darkMode={$darkMode}>{item.user_id}</TextColor>
              </CommonDivWrapper>
              <FeedImage
                src={reviewImage}
                // src={`https://image.tmdb.org/t/p/original${item.img_url}`}
                alt=""
              />
              <ContentTitleWrapper>
                <ContentTitle>{item.movie_title}</ContentTitle>
                <CommonDivWrapper>
                  <StarIcon />
                  <span>{item.rating}</span>
                  <LikeIcon />
                </CommonDivWrapper>
              </ContentTitleWrapper>
              <ContentText $darkMode={$darkMode}>{item.text}</ContentText>
              <Button fontSize="12px" fontWeight="300" $darkMode={$darkMode}>
                더보기
              </Button>
            </FeedContentSection>
          ))}
        </ContentWrapper>
      </FeedContent>
    </FeedSection>
  )
}

export default FeedComponent

const FeedSection = styled.section`
  display: flex;
  flex-flow: column;
  margin-top: 26px;
`

export const StarIcon = styled.button`
  width: 22px;
  height: 22px;
  background-image: url(${star});
  background-repeat: no-repeat;
  cursor: pointer;
  font-family: GmarketSans;
  box-sizing: border-box;
  border: none;
  outline: none;
  background-color: inherit;
  align-self: flex-start;
  display: flex;
  padding: 0;
`
const LikeIcon = styled(StarIcon)`
  background-image: url(${like});
`
const CommonDivWrapper = styled.div<PaddingProps>`
  display: flex;
  align-items: center;
  gap: 8px;
  align-self: flex-start;
  padding-bottom: ${({ $padding }) => $padding};
  margin: auto 0 auto 0;
`

const UserImage = styled.img`
  height: 36px;
  width: 36px;
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid black;
`
const TextColor = styled.span<TextColorProps>`
  color: ${({ $darkMode }) => ($darkMode ? '#E0E0E0' : '#444444')};
  font-size: 14px;
`
const FeedImage = styled.img`
  width: 310px;
  border: 1px solid black;
  display: block;
`
const FeedContent = styled.div`
  display: flex;
  flex-flow: column;
  gap: 4px;
  display: flex;
  align-items: center;
`
const ContentWrapper = styled.div`
  width: 19.375rem;
`

const ContentTitle = styled.span`
  font-weight: bold;
  font-size: 20px;
`
const ContentText = styled.p<TextColorProps>`
  text-align: left;
  color: ${({ $darkMode }) => ($darkMode ? '#E0E0E0' : '#444444')};
  margin: 0;
  font-size: 12px;
`
const ContentTitleWrapper = styled(CommonDivWrapper)`
  justify-content: space-between;
  margin: 10px 0;
  align-items: center;
  align-self: center;
  align-content: center;
`
const Button = styled.button<FontProps>`
  box-sizing: border-box;
  border: none;
  outline: none;
  background-color: inherit;
  cursor: pointer;
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  color: ${({ $darkMode }) => ($darkMode ? '#E0E0E0' : '#777777')};

  align-self: flex-start;
  display: flex;
  padding: 0;
  margin-top: 12px;
`
const FeedContentSection = styled.div`
  margin: 12px 0;
  padding: 10px 0;
`

import styled from 'styled-components'
import star from '@/assets/StarIcon.svg'
import like from '@/assets/HeartIcon.svg'
import { FontProps } from './CategoryComponent'
import useThemeStore from '../store/useThemeStore'
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useBookmarkStore } from '@/store/useBookmarkStore'
import { useAuthStore } from '@/store/useAuthStore'
import {
  addLike,
  deleteLikes,
  fetchAllLikes,
  matchLike,
  useCreateLikesMutation,
  useDeleteLikesMutation
} from '@/api/getLikesData'
import { match } from 'assert'

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

const fetchReviewData = async (userId: string[] | undefined) => {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select()
      .containedBy('likes', [userId] || [])
    console.log('fetchingData', data)

    if (!data) {
      return []
    }
    return data
  } catch (error) {
    console.error('데이터를 불러오는 중 에러 발생:', error)
    throw error
  }
}

/* -------------------------------------------------------------------------- */

function FeedComponent() {
  const { $darkMode } = useThemeStore()
  const [reviews, setReviews] = useState<ReviewData>([])
  const [userId, setUserId] = useState<string | undefined>([])
  const [reviewId, setReviewId] = useState<number>()
  const [isBookMark, setIsBookMark] = useState(false)

  const loginUserData = JSON.parse(localStorage.getItem('userData'))
  const loginUserId = loginUserData.user.id

  useEffect(() => {
    const userData = async () => {
      try {
        const { data } = await supabase.auth.getUser()
        const userData: UserData | null = {
          email: data?.user?.email || undefined,
          id: data?.user?.id || undefined
        }
        setUserId(userData?.id ? userData.id : undefined)
      } catch (error) {
        console.error('에러가 발생했습니다.', error)
      }
    }
    userData()
  }, [])

  const queryClient = useQueryClient()
  const queryKey = ['user_id', reviewId]

  const { data: likeItems } = useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const result = await matchLike(userId)
      return result
    },
    refetchOnReconnect: false,
    refetchOnWindowFocus: false
  })
  console.log('likeItems', likeItems)

  // console.log('fetchData', fetchAllLikes())

  useEffect(() => {
    const loadReviewData = async () => {
      try {
        const { data: reviewData, error: reviewError } = await supabase
          .from('reviews')
          .select()
        if (reviewError) throw new Error()

        // const { data: likesData, error: likesError } = await supabase
        //   .from('reviews')
        //   .select()
        //   .containedBy('likes', [userId] || [])

        // if (likesError) throw new Error()
        setReviews(reviewData)
        console.log('리뷰데이터', reviewData)
        // console.log('likeData', likesData)
      } catch (err) {
        console.error('데이터 불러오기 실패')
        return null
      }
    }

    loadReviewData()
  }, [])

  const handleLikes = async (item: LikeData) => {
    const newLikes: LikesType = {
      user_id: loginUserId,
      review_id: item.id
    }
    console.log(item.id)

    const hasReviewId = likeItems?.some(
      likeItem => likeItem.review_id === item.id
    )

    try {
      if (hasReviewId) {
        await deleteLikes(item.id)
        setReviewId(item.id)
        console.log('delete')
      } else {
        await addLike(newLikes)
        setReviewId(item.id)
        console.log('add')
      }
      queryClient.invalidateQueries({ queryKey: ['likes', reviewId] })
    } catch (error) {
      console.error('북마크 에러 발생:', error)
    }
  }

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
                // src={reviewImage}
                src={
                  item.img_url &&
                  `https://image.tmdb.org/t/p/original/${item.img_url.replace(
                    'public/',
                    ''
                  )}`
                }
                alt=""
              />

              <ContentTitleWrapper>
                <ContentTitle>{item.movie_title}</ContentTitle>
                <CommonDivWrapper>
                  <StarIcon />
                  <span>{item.rating}</span>
                  <LikeIcon onClick={() => handleLikes(item)} />
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

import styled from 'styled-components'
import star from '@/assets/StarIcon.svg'
import like from '@/assets/HeartIcon.svg'
import likefill from '@/assets/HeartIconFill.svg'
import useThemeStore from '../store/useThemeStore'
import { FontProps } from './CategoryComponent'
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { addLike, deleteLikes, matchLike } from '@/api/getLikesData'
import { useBookmarkStore } from '@/store/useBookmarkStore'
import userInfoInLs from '@/utils/userInfoInLs'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'

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

type LikeIconProps = {
  islike?: string
}

/* -------------------------------------------------------------------------- */

function FeedComponent() {
  const { $darkMode } = useThemeStore()
  const [reviews, setReviews] = useState<ReviewData>([])
  const [reviewId, setReviewId] = useState<number>()
  const [likesReview, setLikesReview] = useState<Record<number, boolean>>({})
  const { bookmarkList, setBookmarkList, deleteBookmarkList } =
    useBookmarkStore()

  const getuserData = userInfoInLs()
  const loginUserId = getuserData.userId
  console.log(loginUserId)

  const queryClient = useQueryClient()
  const queryKey = ['user_id', reviewId]

  const { data: likeItems } = useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const result = await matchLike(loginUserId)
      return result
    },
    refetchOnReconnect: false,
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    const likeItemReviewId = likeItems?.map(item => item.review_id)

    if (likeItemReviewId) {
      setBookmarkList(likeItemReviewId)
    }
  }, [likeItems])

  useEffect(() => {
    const loadReviewData = async () => {
      try {
        const { data: reviewData, error: reviewError } = await supabase
          .from('reviews')
          .select()
        if (reviewError) throw new Error()

        setReviews(reviewData)
      } catch (err) {
        console.error('데이터 불러오기 실패')
        return null
      }
    }

    loadReviewData()
  }, [])

  const navigate = useNavigate()
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)

  const handleLikes = async (item: LikeData) => {
    if (!isAuthenticated) {
      const confirmed = window.confirm(
        '로그인 후 사용 할 수 있습니다. 로그인 페이지로 이동하시겠습니까?'
      )
      if (confirmed) {
        navigate('/login')
      } else {
        window.history.back()
      }
      return
    }

    const newLikes: LikesType = {
      user_id: loginUserId,
      review_id: item.id
    }
    setReviewId(item.id)

    const updatedLikesReview = {
      ...likesReview,
      [item.id]: !(likesReview[item.id] ?? false)
    }

    setLikesReview(updatedLikesReview)

    const hasReviewId = likeItems?.some(
      likeItem => likeItem.review_id === item.id
    )
    try {
      if (hasReviewId) {
        await deleteLikes(item.id)
        console.log('delete')
      } else {
        await addLike(newLikes, item.id)

        console.log('add')
      }
      queryClient.invalidateQueries({ queryKey: ['user_id', reviewId] })

      setLikesReview(prev => ({ ...prev, [item.id]: !hasReviewId }))
    } catch (error) {
      setLikesReview(prev => ({ ...prev, [item.id]: !prev[item.id] }))
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
                  <LikeIcon
                    onClick={() => handleLikes(item)}
                    islike={bookmarkList.includes(item.id) ? 'true' : 'false'}
                  />
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

const LikeIcon = styled(StarIcon)<LikeIconProps>`
  background-image: ${({ islike }) =>
    islike === 'true' ? `url(${likefill})` : `url(${like})`};
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

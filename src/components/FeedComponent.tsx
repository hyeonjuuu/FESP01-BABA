import styled from 'styled-components'
import star from '@/assets/StarIcon.svg'
import like from '@/assets/HeartIcon.svg'
import { useEffect, useState } from 'react'
import userImage from '@/assets/userIcon.png'
import { useNavigate } from 'react-router-dom'
import { FontProps } from './CategoryComponent'
import userInfoInLs from '@/utils/userInfoInLs'
import { addFavorite } from '@/api/getLikesData'
import likefill from '@/assets/HeartIconFill.svg'
import useThemeStore from '../store/useThemeStore'
import { createClient } from '@supabase/supabase-js'
import { useAuthStore } from '@/store/useAuthStore'
import { getProfileImgUrl } from '@/api/profileImgApi'
import { useBookmarkStore } from '@/store/useBookmarkStore'

const supabase = createClient(
  `${import.meta.env.VITE_SUPABASE_URL}`,
  `${import.meta.env.VITE_SUPABASE_KEY}`
)

interface IsLikedProps {
  id: number
  likes: string[]
}

interface PaddingProps {
  $padding?: string
}

interface TextColorProps {
  $darkMode: boolean
}

type LikeIconProps = {
  $islike?: boolean
  disabled?: boolean
}

/* -------------------------------------------------------------------------- */

function FeedComponent() {
  const { $darkMode } = useThemeStore()
  const [reviews, setReviews] = useState<ReviewsProps[]>([])
  const [, setReviewsId] = useState<string[]>([])
  const [usersId, setUsersId] = useState<string[]>([])
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [isLikeReviews, setIsLikReviews] = useState<IsLikedProps[] | null>([])
  const [myLikesId, setMyLikesId] = useState<number[]>([])

  const { bookmarkList, setBookmarkList, deleteBookmarkList } =
    useBookmarkStore()

  const [renderProfileImg, setRenderProfileImg] = useState<(string | null)[]>(
    []
  )

  const getuserData = userInfoInLs()
  const loginUserId = getuserData.userId

  const navigate = useNavigate()
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)

  //# 전체 리뷰 가져오기
  useEffect(() => {
    const loadReviewData = async () => {
      try {
        const { data: reviewData, error: reviewError } = await supabase
          .from('reviews')
          .select()

        if (reviewError) throw new Error()

        const sortedReviewData = reviewData.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
        setReviews(sortedReviewData)

        // 내가 누른 좋아요
        const myLikes: IsLikedProps[] = sortedReviewData
          .map(item => ({
            id: item.id,
            likes: item.likes
          }))
          .filter(entry => {
            const likesArray = entry.likes || []
            const loginUserIdLiked = likesArray.includes(loginUserId)
            return (
              entry.likes !== null &&
              Array.isArray(entry.likes) &&
              loginUserIdLiked
            )
          })
        setIsLikReviews(myLikes)

        const myLikesIdArray = myLikes.map(item => item.id)
        setMyLikesId(myLikesIdArray)

        const reviewsId = sortedReviewData.map(item => item.user_id)
        setReviewsId(reviewsId)

        const usersId = sortedReviewData.map(data => data.user_id)
        setUsersId(usersId)
      } catch (err) {
        console.error(err)
        return null
      }
    }

    loadReviewData()
  }, [isLiked])

  const fetchAndRenderProfileImg = async () => {
    if (loginUserId && usersId.length > 0) {
      try {
        const imgSrc = await Promise.all(
          usersId.map(async userId => await getProfileImgUrl(userId))
        )
        setRenderProfileImg(imgSrc)
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    fetchAndRenderProfileImg()
  }, [loginUserId, usersId])

  //# 좋아요
  const handleLikes = async (item: ReviewsProps, loginUserId: string) => {
    if (!isAuthenticated) {
      const confirmed = window.confirm(
        '로그인 후 사용 할 수 있습니다. 로그인 페이지로 이동하시겠습니까?'
      )
      if (confirmed) {
        navigate('/login')
      }
      return
    }

    const movieId = item.movie_id
    const userId = item.user_id
    const text = item.text
    const ott = item.ott
    const rating = item.rating
    const title = item.movie_title
    const id = item.id // 리뷰 아이디

    const checkMyLikesId = myLikesId.filter(reviewId => reviewId === id)

    const targetLikes = isLikeReviews
      ?.filter(item => checkMyLikesId.includes(item.id))
      .map(item => item.likes)

    // 2차원 배열을 1차원 배열로 만듭니다
    if (targetLikes) {
      const likesArray = setBookmarkList(targetLikes.flat())
      console.log('likesArray: ', likesArray)
    }

    if (checkMyLikesId.length !== 0 && loginUserId) {
      const newBookmarkList = bookmarkList.filter(item => item !== loginUserId)
      deleteBookmarkList(loginUserId)

      await addFavorite(
        movieId,
        userId,
        text,
        ott,
        rating,
        title,
        id,
        newBookmarkList,
        loginUserId
      )
    } else {
      const newBookmarkList = [...bookmarkList, loginUserId]
      setBookmarkList(newBookmarkList)

      console.log('중복아님', newBookmarkList)

      await addFavorite(
        movieId,
        userId,
        text,
        ott,
        rating,
        title,
        id,
        newBookmarkList,
        loginUserId
      )
    }

    setIsLiked(prevState => !prevState)
  }
  console.log('최초 bookmarkList: ', bookmarkList)

  return (
    <FeedSection>
      <FeedContent>
        <ContentWrapper>
          {reviews?.map((item: ReviewsProps, index: number) => (
            <FeedContentSection key={item.id}>
              <CommonDivWrapper $padding="10px">
                <UserImage
                  src={
                    renderProfileImg[index]
                      ? `https://ufinqahbxsrpjbqmrvti.supabase.co/storage/v1/object/public/userImage/${renderProfileImg[index]}`
                      : userImage
                  }
                  alt="프로필 이미지"
                />
                <TextColor $darkMode={$darkMode}>{item.nickname}</TextColor>
              </CommonDivWrapper>
              <FeedImage
                src={
                  item.img_url
                    ? `https://ufinqahbxsrpjbqmrvti.supabase.co/storage/v1/object/public/movieImage/${item.img_url}`
                    : `https://image.tmdb.org/t/p/original/${item?.default_img?.replace(
                        'public/',
                        ''
                      )}`
                }
                alt={`${item.movie_title} 이미지`}
              />

              <ContentTitleWrapper>
                <ContentTitle>{item.movie_title}</ContentTitle>
                <CommonDivWrapper>
                  <StarIcon />
                  <span>{item.rating}</span>

                  {loginUserId === item.user_id ? null : (
                    <LikeIcon
                      disabled={loginUserId === item.user_id}
                      onClick={() => handleLikes(item, loginUserId!)}
                      $islike={isLikeReviews?.some(
                        (like: IsLikedProps | null) =>
                          like && like.id === item.id
                      )}
                    />
                  )}
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
  background-image: ${({ $islike }) =>
    $islike === true ? `url(${likefill})` : `url(${like})`};
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

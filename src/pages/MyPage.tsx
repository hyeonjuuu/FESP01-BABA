import styled from 'styled-components'
import userImage from '@/assets/userIcon.png'
import { Link, useNavigate } from 'react-router-dom'
import { getLikeReviews, getUserReviews } from '@/api/reviewApi'
import FavRing from '@/components/mypage/FavRing'
import { SetStateAction, useEffect, useRef, useState } from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import {
  addImgUrlToUsers,
  deleteProfileImg,
  getProfileImgUrl,
  uploadProfileImg
} from '@/api/profileImgApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faStar } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import userInfoInLs from '@/utils/userInfoInLs'
import { getMyLikes, getfavorites, matchLike } from '@/api/getLikesData'

interface ReviewProps {
  created_at: string
  id: number
  img_url: string | null
  movie_id: string
  movie_title: string
  ott: string[]
  rating: number
  text: string
  updated_at: string | null
  user_id: string
  like: string | null
  likes: string | null
}

interface PostProps {
  key: number
}

function MyPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [userId, setUserId] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [profileImg, setProfileImg] = useState<File | null>(null)
  const [renderProfileImg, setRenderProfileImg] = useState<string | null>(null)
  const [reviews, setReviews] = useState<ReviewProps[] | null>(null)
  const [reviewImgs, setReviewImgs] = useState<string[] | null>(null)
  const [defaultImgs, setDefaultImgs] = useState<string[]>([])
  const [userImgs, setUserImgs] = useState<string[]>([])
  const [isShowReviews, setIsShowReviews] = useState<boolean>(true)
  const [myLikes, setMyLikes] = useState<any[]>([])
  // const prevMyLikesRef = useRef<any[] | undefined>() // myLikes의 이전 상태를 추적하는 ref를 추가합니다.
  const [isRerender, setIsRerender] = useState<boolean>(false)

  console.log('reviews: ', reviews)

  //# 로그인 여부 확인
  const navigate = useNavigate()
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)

  useEffect(() => {
    // const userInfo = userInfoInLs()
    // setUserId(userInfo.userId) // users의 user_email = revews의 user_id
    // setUserEmail(userInfo.userEmail) // local storage의 email

    if (!isAuthenticated) {
      const confirmed = window.confirm(
        '로그인 후 사용 할 수 있습니다. 로그인 페이지로 이동하시겠습니까?'
      )
      if (confirmed) {
        navigate('/login')
      } else {
        window.history.back()
      }
    }
  }, [isAuthenticated])

  //# 프로필 이미지
  // 프로필 이미지 선택
  const handleProfileImg = () => {
    fileInputRef?.current?.click()
  }

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    setProfileImg(selectedFile || null)
  }

  // 프로필 이미지 전송
  const selectProfileImg = async () => {
    if (profileImg) {
      const imgUrl = await uploadProfileImg(profileImg, userId!)
      await addImgUrlToUsers(userId!, imgUrl!)
      fetchAndRenderProfileImg()
    }
  }

  useEffect(() => {
    selectProfileImg()
  }, [profileImg])

  // 프로필 이미지 삭제
  const handleDeleteProfileImg = async () => {
    const confirmed = window.confirm('프로필 이미지를 삭제하시겠습니까?')
    if (confirmed) {
      await deleteProfileImg(userId!)
      await addImgUrlToUsers(userId!, null)
      setRenderProfileImg(null)
    }
  }

  // 프로필 이미지 렌더링
  const fetchAndRenderProfileImg = async () => {
    if (userId) {
      try {
        const imgSrc = await getProfileImgUrl(userId)
        if (imgSrc) {
          setRenderProfileImg(imgSrc)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    fetchAndRenderProfileImg()
  }, [userId, renderProfileImg])

  const handleShowReviews = () => {
    setIsShowReviews(true)
  }

  const handleShowLikes = () => {
    setIsShowReviews(false)
  }

  //# 작성 글과 좋아요 가져오기
  useEffect(() => {
    const userInfo = userInfoInLs()
    setUserId(userInfo.userId) // users의 user_email = revews의 user_id
    setUserEmail(userInfo.userEmail) // local storage의 email

    if (!userId) {
      return
    }

    // 리뷰 가져오기
    const fetchUserReviews = async () => {
      const reviews = await getUserReviews(userId!)

      if (!reviews) {
        return
      }

      const reviewImgs = reviews.map(review => review.img_url)
      const movieTitles = reviews.map(review => review.movie_title)
      const reviewId = reviews.map(review => review.movie_id)
      const defaultImg = reviews.map(review => review.default_img)
      const userImg = reviews.map(review => review.img_url)

      setReviews(reviews)
      setReviewImgs(reviewImgs!)
      setDefaultImgs(defaultImg!)
      setUserImgs(userImg!)
    }

    // 북마크 가져오기
    const fetchFavoriteReviews = async () => {
      try {
        const getLikes = await getMyLikes([userId!])

        if (!getLikes) {
          return
        }

        console.log('getLikes: ', getLikes)

        const myLikes = getLikes?.data
          ?.map(item => ({
            id: item.id,
            likes: item.likes,
            defaultImg: item.default_img,
            imgUrl: item.img_url,
            rating: item.rating,
            title: item.movie_title,
            movieId: item.movie_id
          }))
          .filter(item => {
            const likesArray = item.likes || []
            const userIdLikes = likesArray.includes(userId) // true는 좋아요 누른 것
            return (
              item.likes !== null && Array.isArray(item.likes) && userIdLikes
            )
          })

        setMyLikes(myLikes!)
        console.log('myLikes: ', myLikes)
      } catch (error) {
        console.error(error)
      }
    }

    fetchUserReviews()
    fetchFavoriteReviews()
  }, [userId])

  //# 북마크 가져오기
  // const fetchFavoriteReviews = async () => {
  //   try {
  //     const getLikes = await getMyLikes([userId!])

  //     if (!getLikes) {
  //       return
  //     }

  //     console.log('getLikes: ', getLikes)

  //     const myLikes = getLikes?.data
  //       ?.map(item => ({
  //         id: item.id,
  //         likes: item.likes,
  //         defaultImg: item.default_img,
  //         imgUrl: item.img_url,
  //         rating: item.rating,
  //         title: item.title,
  //         movieId: item.movie_id
  //       }))
  //       .filter(item => {
  //         const likesArray = item.likes || []
  //         const userIdLikes = likesArray.includes(userId) // true는 좋아요 누른 것
  //         return item.likes !== null && Array.isArray(item.likes) && userIdLikes
  //       })

  //     setMyLikes(myLikes!)
  //     console.log('myLikes: ', myLikes)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  // useEffect(() => {
  //   fetchFavoriteReviews()
  //   setIsRerender(true) // myLikes 가져오기 위함
  // }, [isRerender])

  return (
    <Box>
      <ContentBox>
        <ProfileContain>
          <form action="#">
            <ImageWrapper>
              <ProfileImage
                src={
                  renderProfileImg
                    ? `https://ufinqahbxsrpjbqmrvti.supabase.co/storage/v1/object/public/userImage/${renderProfileImg}`
                    : userImage
                }
                alt="사용자 이미지"
                onClick={handleProfileImg}
              />
              <div>
                <label htmlFor="photo">사진</label>
                <input
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  name="photo"
                  id="photo"
                  onChange={handleUpload}
                ></input>
              </div>
            </ImageWrapper>
          </form>

          <ProfileInfo>
            <p>{userEmail}</p>
            <ProfileBtn onClick={handleDeleteProfileImg}>
              프로필 편집
            </ProfileBtn>
          </ProfileInfo>
        </ProfileContain>

        <Container>
          <FavRing />
          <FavRing />
          <FavRing />
          <FavRing />
        </Container>

        <MarginContainer>
          <Wrapper onClick={handleShowReviews}>
            <StyledP>게시물</StyledP>
            <span>{reviews?.length}</span>
          </Wrapper>

          <Wrapper onClick={handleShowLikes}>
            <StyledP>좋아요</StyledP>
            <span>{myLikes?.length}</span>
          </Wrapper>
        </MarginContainer>

        <PostsContain>
          {isShowReviews ? (
            reviews && reviews.length > 0 ? (
              // 1. 리뷰 있을 때
              reviews.map((review, index) => (
                <Post key={review.id}>
                  <HoverLink
                    to={`/edit/${review.id}`}
                    state={{
                      review_id: review.id,
                      user_id: userId,
                      movie_id: review.movie_id
                    }}
                  >
                    <PostImg
                      src={
                        review.img_url
                          ? `https://ufinqahbxsrpjbqmrvti.supabase.co/storage/v1/object/public/movieImage/${reviewImgs?.[index]}`
                          : `https://image.tmdb.org/t/p/original/${defaultImgs[
                              index
                            ]?.replace('public/', '')}`
                      }
                      alt={`${review.movie_title} 포스터`}
                    />
                    <HoverDiv>
                      <MovieTitleSpan>{review.movie_title}</MovieTitleSpan>
                      <RatingSpan>
                        <FontAwesomeIcon
                          icon={faStar}
                          style={{ color: '#FFC61A' }}
                        />{' '}
                        {review.rating}
                      </RatingSpan>
                    </HoverDiv>
                  </HoverLink>
                </Post>
              ))
            ) : (
              // 2. 리뷰 없을 때
              <PictureWrapper>
                <Picture>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </Picture>
                <PictureDiv>리뷰 공유</PictureDiv>
                <div>리뷰를 공유하면 회원님의 프로필에 표시됩니다.</div>
                <PictureLink to={'/writing'}>첫 리뷰 공유하기</PictureLink>
              </PictureWrapper>
            )
          ) : myLikes && myLikes.length > 0 ? (
            // 3. 좋아요 있을 때
            myLikes.map(like => (
              <Post key={like.id}>
                <HoverLink to={`/detail/${like.id}`}>
                  <PostImg
                    src={
                      like.imgUrl
                        ? `https://ufinqahbxsrpjbqmrvti.supabase.co/storage/v1/object/public/movieImage/${like.imgUrl}`
                        : `https://image.tmdb.org/t/p/original/${like.defaultImg?.replace(
                            'public/',
                            ''
                          )}`
                    }
                    alt={`${like.title} 포스터`}
                  />
                  <HoverDiv>
                    <MovieTitleSpan>{like.title}</MovieTitleSpan>
                    <RatingSpan>
                      <FontAwesomeIcon
                        icon={faStar}
                        style={{ color: '#FFC61A' }}
                      />{' '}
                      {like.rating}
                    </RatingSpan>
                  </HoverDiv>
                </HoverLink>
              </Post>
            ))
          ) : (
            // 4. 좋아요 없을 때
            <PictureWrapper>
              <Picture>
                <FontAwesomeIcon icon={faHeart} />
              </Picture>
              <PictureDiv>저장</PictureDiv>
              <div>다시 보고 싶은 글을 저장하세요.</div>
            </PictureWrapper>
          )}
        </PostsContain>
      </ContentBox>
    </Box>
  )
}

export default MyPage

const Box = styled.section`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 70px;

  @media (min-width: 1031px) {
    display: flex;
    align-items: center;
  }
  @media (min-width: 701px) and(max-width: 1030px) {
    display: flex;
    align-items: center;
  }
`

const ContentBox = styled.div`
  width: 390px;
`

const ProfileContain = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 12px;
`

const ImageWrapper = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  overflow: hidden;
`

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
`

const ProfileInfo = styled.div`
  display: flex;
  align-items: start;
  flex-direction: column;
`

const ProfileBtn = styled.button`
  width: 240px;
  height: 30px;
  background-color: EFEFEF;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  border: none;
  &:hover {
    background-color: #0282d1;
    color: #ffffff;
  }
`

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
`

const MarginContainer = styled(Container)`
  margin: 15px 0;
  border: 1px solid black;
`

const Wrapper = styled.button`
  width: 50%;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  gap: 10px;
  &:hover {
    background-color: #0282d1;
    color: #ffffff;
  }
`
const StyledP = styled.p`
  margin: 0;
`

const PostsContain = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
`

const Post = styled.div<PostProps>`
  width: 129px;
  height: 129px;
  background-color: #0282d1;
`

const HoverLink = styled(Link)`
  width: 100%;
  height: 100%;
  display: block; /* Link는 inline 요소이므로 block으로 변경 */
  position: relative;

  &:hover {
    > img {
      filter: saturate(0%) brightness(40%);
      transition: 0.5s;
    }
    > div {
      color: white;
      visibility: visible;
    }
  }
`

const HoverDiv = styled.div`
  width: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  visibility: hidden;
`

const MovieTitleSpan = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

const RatingSpan = styled.span`
  display: block;
  padding-top: 10px;
  color: #ffc61a;
`

const PostImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const PictureWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 30px 0;
  width: 100%;
`
const Picture = styled.div`
  font-size: 50px;
`
const PictureDiv = styled.div`
  font-size: 30px;
  font-weight: 700;
`

const PictureLink = styled(Link)`
  font-size: 20px;
  color: #0282d1;
  padding: 20px;
  cursor: pointer;
`

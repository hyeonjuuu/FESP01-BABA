import styled from 'styled-components'
import userImage from '@/assets/userIcon.png'
import { Link, useNavigate } from 'react-router-dom'
import { getUserReviews } from '@/api/reviewApi'
import FavRing from '@/components/mypage/FavRing'
import { useEffect, useRef, useState } from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import getSearchMovies from '@/api/getSearchMovies'
import {
  addImgUrlToUsers,
  deleteProfileImg,
  getProfileImgUrl,
  uploadProfileImg
} from '@/api/profileImgApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faStar } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import useUserInfoStore from '@/store/useUserInfoStore'

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

// interface MovieProps {
//   id: number
//   title: string
//   poster_path: string
// }

interface PostProps {
  key: number
}

function MyPage() {
  const userInfo = useUserInfoStore()

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [userId, setUserId] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [profileImg, setProfileImg] = useState<File | null>(null)
  const [renderProfileImg, setRenderProfileImg] = useState<string | null>(null)
  const [reviews, setReviews] = useState<ReviewProps[] | null>(null)
  const [reviewImgs, setReviewImgs] = useState<string[] | null>(null)
  const [movieImgs, setMovieImgs] = useState<(string | undefined)[] | null>(
    null
  )
  const [isShowReviews, setIsShowReviews] = useState<boolean>(true)
  console.log('reviews: ', reviews)
  console.log('profileImg: ', profileImg)
  console.log('renderProfileImg: ', renderProfileImg)

  //# 로그인 여부 확인
  const navigate = useNavigate()
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)

  useEffect(() => {
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

  //# 리뷰 가져오기
  useEffect(() => {
    // const userInfo = userInfoInLs()

    setUserId(userInfo.userId) // local storage의 id = users의 user_email = revews의 user_id
    setUserEmail(userInfo.userEmail) // local storage의 email

    if (!userId) {
      return
    }

    const fetchUserReviews = async () => {
      const reviews = await getUserReviews(userId)

      if (!reviews) {
        return
      }

      const reviewImgs = reviews.map(review => review.img_url)
      const movieTitles = reviews.map(review => review.movie_title)
      const reviewId = reviews.map(review => review.movie_id)

      // 기본 영화 포스터 찾기
      const moviesArray = await Promise.all(
        movieTitles.map(async title => {
          const response = await getSearchMovies(title)
          return response.results
        })
      )

      const posterPath = moviesArray.map(
        (movies: MovieProps[], index: number) => {
          const movie = movies.find(m => m.id.toString() === reviewId[index])
          return movie ? movie.poster_path : undefined
        }
      )

      setReviews(reviews)
      setReviewImgs(reviewImgs)
      setMovieImgs(posterPath)
    }

    fetchUserReviews()
  }, [userId])

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
    console.log('renderProfileImg updated:', renderProfileImg)

    fetchAndRenderProfileImg()
  }, [userId, renderProfileImg])

  const handleShowReviews = () => {
    setIsShowReviews(true)
  }

  const handleShowLikes = () => {
    setIsShowReviews(false)
  }

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
            <span>5</span>
          </Wrapper>
        </MarginContainer>
        <PostsContain>
          {isShowReviews ? (
            reviews && reviews.length > 0 ? (
              // Case 1: isShowReviews가 true이고 review.length > 0 일 때
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
                          : `https://image.tmdb.org/t/p/original${movieImgs?.[index]}`
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
              // Case 2: isShowReviews가 true이고 review.length = 0 일 때
              <PictureWrapper>
                <Picture>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </Picture>
                <PictureDiv>리뷰 공유</PictureDiv>
                <div>리뷰를 공유하면 회원님의 프로필에 표시됩니다.</div>
                <PictureLink to={'/writing'}>첫 리뷰 공유하기</PictureLink>
              </PictureWrapper>
            )
          ) : reviews && reviews.length > 0 ? (
            // Case 3: isShowReviews가 false이고 review.length > 0 일 때
            <PictureWrapper>
              <div>좋아요 있을 때</div>
            </PictureWrapper>
          ) : (
            // Case 4: isShowReviews가 false이고 review.length = 0 일 때
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

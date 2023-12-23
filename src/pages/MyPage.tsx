import styled from 'styled-components'
import UserIcon from '@/assets/icon/User.png'
import { Link, useNavigate } from 'react-router-dom'
import { getUserReviews } from '@/api/reviewApi'
import FavRing from '@/components/mypage/FavRing'
import { useEffect, useRef, useState } from 'react'
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
import { getMyLikes } from '@/api/getLikesData'
import useThemeStore from '@/store/useThemeStore'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Pagination } from 'swiper/modules'

interface PostProps {
  key: number
}

interface DarkModeProps {
  $darkMode: boolean
}

interface WrapperProps {
  $bgColor: string
  color: string
}

function MyPage() {
  const { $darkMode } = useThemeStore()
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [userId, setUserId] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [profileImg, setProfileImg] = useState<File | null>(null)
  const [renderProfileImg, setRenderProfileImg] = useState<string | null>(null)
  const [reviews, setReviews] = useState<ReviewsProps[] | null>(null)
  const [isShowReviews, setIsShowReviews] = useState<boolean>(true)
  const [popularReviews, setPopularReviews] = useState<ReviewsProps[] | null>(
    null
  )
  const [myLikes, setMyLikes] = useState<any[]>([])

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
    setUserId(userInfo.userId)
    setUserEmail(userInfo.userEmail)

    if (!userId) {
      return
    }

    // 리뷰 가져오기
    const fetchUserReviews = async () => {
      const reviews = await getUserReviews(userId!)

      if (!reviews) {
        return
      }

      const sortedReviews = reviews.sort((a, b) => {
        const dateA = new Date(a.created_at || 0).getTime()
        const dateB = new Date(b.created_at || 0).getTime()
        return dateB - dateA
      })

      setReviews(sortedReviews)

      // 좋아요 많이 받은 글
      const sortedPopularReviews = Array.from(reviews)
        .filter(review => review.likes?.length > 0) // likes가 1 이상인 것만 필터링
        .sort((a, b) => {
          const lengthComparison =
            (b.likes?.length || 0) - (a.likes?.length || 0)

          if (lengthComparison === 0) {
            const dateA = new Date(a.created_at || 0).getTime()
            const dateB = new Date(b.created_at || 0).getTime()
            return dateB - dateA
          }

          return lengthComparison
        })
        .slice(0, 10)

      setPopularReviews(sortedPopularReviews)
    }

    // 북마크 가져오기
    const fetchFavoriteReviews = async () => {
      try {
        const getLikes = await getMyLikes([userId!])

        if (!getLikes) {
          return
        }

        const myLikes = getLikes?.data
          ?.map(item => ({
            id: item.id,
            likes: item.likes,
            defaultImg: item.default_img,
            imgUrl: item.img_url,
            rating: item.rating,
            title: item.movie_title,
            movieId: item.movie_id,
            created: item.created_at
          }))
          .filter(item => {
            const likesArray = item.likes || []
            const userIdLikes = likesArray.includes(userId) // true는 좋아요 누른 것
            return (
              item.likes !== null && Array.isArray(item.likes) && userIdLikes
            )
          })
          .sort((a, b) => {
            const dateA = new Date(a.created || 0).getTime()
            const dateB = new Date(b.created || 0).getTime()
            return dateB - dateA
          })

        setMyLikes(myLikes!)
      } catch (error) {
        console.error(error)
      }
    }

    fetchUserReviews()
    fetchFavoriteReviews()
  }, [userId])

  const handleGoToEdit = (review: ReviewsProps, userId: string) => {
    const confirmResult = window.confirm('리뷰 수정 페이지로 이동하겠습니까?')

    if (confirmResult) {
      navigate(`/edit/${review.id}`, {
        state: {
          review,
          userId
        }
      })
    }
  }

  //# 로그아웃
  const handleLogOut = () => {
    console.log('로그아웃')
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
                    : UserIcon
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
            <ProfileBtnWrapper>
              <ProfileBtn onClick={handleDeleteProfileImg}>
                프로필 편집
              </ProfileBtn>
              <ProfileBtn onClick={handleLogOut}>로그아웃</ProfileBtn>
            </ProfileBtnWrapper>
          </ProfileInfo>
        </ProfileContain>

        {popularReviews && popularReviews.length > 0 ? (
          <Swiper
            className="mySwiper"
            slidesPerView={4}
            breakpoints={{
              700: {
                slidesPerView: 6
              }
            }}
            loop={true}
            modules={[Pagination]}
          >
            <Container>
              {popularReviews.map(popular => (
                <SwiperSlide key={popular.id}>
                  <FavRing review={popular} />
                </SwiperSlide>
              ))}
            </Container>
          </Swiper>
        ) : null}

        <MarginContainer $darkMode={$darkMode}>
          <Wrapper
            onClick={handleShowReviews}
            color={isShowReviews ? '#FFFFFF' : ''}
            $bgColor={isShowReviews ? '#3797EF' : ''}
          >
            <StyledP>게시물</StyledP>
            <span>{reviews?.length}</span>
          </Wrapper>

          <Wrapper
            onClick={handleShowLikes}
            color={!isShowReviews ? '#FFFFFF' : ''}
            $bgColor={!isShowReviews ? '#3797EF' : ''}
          >
            <StyledP>좋아요</StyledP>
            <span>{myLikes?.length}</span>
          </Wrapper>
        </MarginContainer>

        <PostsContain>
          {isShowReviews ? (
            reviews && reviews.length > 0 ? (
              // 1. 리뷰 있을 때
              reviews.map(review => (
                <Post
                  key={review.id}
                  onClick={() => handleGoToEdit(review, userId!)}
                >
                  <PostImg
                    src={
                      review.img_url
                        ? `https://ufinqahbxsrpjbqmrvti.supabase.co/storage/v1/object/public/movieImage/${review.img_url}`
                        : `https://image.tmdb.org/t/p/original/${review.default_img?.replace(
                            'public/',
                            ''
                          )}`
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
                <HoverLink to={`/info/${like.movieId}`}>
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
  width: 98%;
  margin-bottom: 70px;

  @media (min-width: 1031px) {
    display: flex;
    align-items: center;
  }

  @media (min-width: 701px) and (max-width: 1030px) {
    display: flex;
    align-items: center;
  }
`

const ContentBox = styled.div`
  width: 100%; /* Make it full-width on mobile */
  max-width: 600px; /* Adjust the maximum width for larger screens if needed */
  margin: 0 auto;
`

const ProfileContain = styled.div`
  display: flex;
  flex-direction: column; /* Stack items vertically on small screens */
  align-items: center;
  padding: 0 12px;
`

const ImageWrapper = styled.div`
  width: 120px; /* Adjust the image size */
  height: 120px; /* Adjust the image size */
  border-radius: 50%;
  overflow: hidden;
`

const ProfileImage = styled.img<{ theme: { bgColor: string } }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  filter: ${props =>
    props.theme.bgColor === '#1E1E1E' ? 'invert(1)' : 'none'};
`

const ProfileInfo = styled.div`
  margin-top: 15px; /* Add some spacing */
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ProfileBtnWrapper = styled.div`
  width: 80%;
  display: flex;
  gap: 10px;
  justify-content: center;
`

const ProfileBtn = styled.button`
  width: 45%;
  height: 40px;
  background-color: #efefef;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  border: none;
  margin-top: 15px; /* Add some spacing */
  cursor: pointer;
  color: #303032;

  &:hover {
    background-color: #0282d1;
    color: #ffffff;
  }
`

const Container = styled.div`
  display: flex;
  justify-content: start;
  margin: 0 auto;
`

const MarginContainer = styled.div<DarkModeProps>`
  display: flex;
  width: 100%;
  margin: 15px 0;
  border: 1px solid black;
  border-color: ${({ $darkMode }) => ($darkMode ? '#FFFFFF' : '#303032')};
  justify-content: space-between;

  @media (max-width: 700px) {
    gap: 10px;
    /* flex-wrap: wrap; */
  }
`

const Wrapper = styled.div<WrapperProps>`
  width: 48%; /* Two columns on larger screens */
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 0;
  cursor: pointer;
  background-color: ${({ $bgColor }) => $bgColor};
  color: ${({ color }) => color};
  flex-grow: 1;

  @media (max-width: 700px) {
    width: 100%; /* Full-width on smaller screens */
  }

  &:hover {
    background-color: #fffc9f;
    color: black;
  }
`

const StyledP = styled.p`
  margin: 0;
  padding-bottom: 10px;
`

const PostsContain = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  width: 100%;
  justify-content: start;
`

const Post = styled.div<PostProps>`
  width: calc(
    25% - 1px
  ); /* 4개의 아이템이 한 줄에 나타날 수 있도록 너비를 조절합니다. */
  height: 129px;
  background-color: #0282d1;
  cursor: pointer;
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

export const HoverLink = styled(Link)`
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

const PostImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const HoverDiv = styled.div`
  width: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  visibility: hidden;
`
export const MovieTitleSpan = styled.span`
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

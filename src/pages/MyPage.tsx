import styled from 'styled-components'
import userImage from '@/assets/userIcon.png'
import FavRing from '@/components/mypage/FavRing'
import { useEffect, useRef, useState } from 'react'
import {
  addImgUrlToUsers,
  getProfileImgUrl,
  uploadProfileImg
} from '@/api/profileImgApi'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'
import userInfoInLs from '@/utils/userInfoInLs'
import { getReviewData, getReviewDataWithUserInfo } from '@/api/getReviewData'
import { getImgUrl, getUserReviews } from '@/api/reviewApi'

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
  const [renderedUserImg, setRenderedUserImg] = useState<string | null>(null)

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
    const userInfo = userInfoInLs()

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
      setReviewImgs(reviewImgs)
      setReviews(reviews)

      console.log('reviewImgs: ', reviewImgs)
      console.log('reviews: ', reviews)
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
      fetchAndRenderProfileImg() // 이미지 업로드 후 이미지 렌더링
    }
  }

  useEffect(() => {
    selectProfileImg()
  }, [profileImg])

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
  }, [userId])

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
            <ProfileBtn>프로필 편집</ProfileBtn>
          </ProfileInfo>
        </ProfileContain>

        <Container>
          <FavRing />
          <FavRing />
          <FavRing />
          <FavRing />
        </Container>

        <MarginContainer>
          <Wrapper>
            <p>게시물</p>
            <span>10</span>
          </Wrapper>

          <Wrapper>
            <p>좋아요</p>
            <span>5</span>
          </Wrapper>
        </MarginContainer>

        <PostsContain>
          {reviews?.map((review, index) => (
            <Post key={review.id}>
              <img
                // src={
                //   review.img_url
                //     ? `https://ufinqahbxsrpjbqmrvti.supabase.co/storage/v1/object/public/movieImage/${review.img_url}`

                //     : getSearchMovies()
                //      `https://image.tmdb.org/t/p/original${result.poster_path}`
                // }
                // alt={review.movie_title}
                src={
                  review.img_url
                    ? `https://ufinqahbxsrpjbqmrvti.supabase.co/storage/v1/object/public/movieImage/${reviewImgs?.[index]}`
                    : 'https://picsum.photos/seed/picsum/200/300'
                }
                alt={review.movie_title}
              />
            </Post>
          ))}
          {/* <Post></Post>
          <Post></Post>
          <Post></Post>
          <Post></Post>
          <Post></Post>
          <Post></Post>
          <Post></Post>
          <Post></Post>
          <Post></Post>
          <Post></Post>
          <Post></Post>
          <Post></Post>
          <Post></Post>
          <Post></Post> */}
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

  /* padding-right: 34px; */
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
  &:hover {
    background-color: tomato;
  }
`

const PostsContain = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
`

const Post = styled.div<PostProps>`
  width: 129px;
  height: 129px;
  background-color: blueviolet;
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
`

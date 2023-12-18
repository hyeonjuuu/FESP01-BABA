import styled from 'styled-components'
import userImage from '@/assets/userIcon.png'
import FavRing from '@/components/mypage/FavRing'
import { useEffect, useRef, useState } from 'react'
import {
  addImgUrltoUsers,
  getProfileImgUrl,
  uploadProfileImg
} from '@/api/profileImgApi'

function MyPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [profileImg, setProfileImg] = useState<File | null>(null)
  const [renderUserImg, setRenderUserImg] = useState<string | null>(null)

  //# 프로필 이미지 선택
  const handleProfileImg = () => {
    fileInputRef?.current?.click()
  }

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    setProfileImg(selectedFile || null)
  }

  //# 프로필 이미지 전송
  const selectProfileImg = async () => {
    if (profileImg) {
      const imgUrl = await uploadProfileImg(profileImg)
      await addImgUrltoUsers(imgUrl!)
    }
  }

  useEffect(() => {
    selectProfileImg()
  }, [profileImg])

  //# 프로필 이미지 렌더링
  const fetchAndRenderProfileImg = async () => {
    try {
      const imgSrc = await getProfileImgUrl(8) // 프로필 이미지 있을 때
      // const imgSrc = await getProfileImgUrl(0) // 프로필 이미지 없을 때
      if (imgSrc) {
        setRenderUserImg(imgSrc)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchAndRenderProfileImg()
  }, [renderUserImg])

  return (
    <Box>
      <ContentBox>
        <ProfileContain>
          <form action="#">
            <ImageWrapper>
              <ProfileImage
                src={
                  renderUserImg
                    ? `https://ufinqahbxsrpjbqmrvti.supabase.co/storage/v1/object/public/userImage/${renderUserImg}`
                    : userImage
                }
                alt="사용자 이미지"
                onClick={handleProfileImg}
              />

              {/* 실제 파일 입력란은 감춰두고, 사용자 정의 버튼 클릭 시 트리거되도록 함 */}
              <div>
                <label htmlFor="photo">사진</label>
                <input
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  type="file"
                  accept="image/*"
                  name="photo"
                  id="photo"
                  onChange={handleUpload}
                ></input>
              </div>
            </ImageWrapper>
          </form>

          <ProfileInfo>
            <p>bomlang4211@gmail.com</p>
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
          <Post></Post>
          <Post></Post>
          <Post></Post>
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

const Post = styled.div`
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

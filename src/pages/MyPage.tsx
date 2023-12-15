import styled from 'styled-components'
import userImage from '@/assets/userIcon.png'
import FavRing from '@/components/mypage/FavRing'
import { useEffect, useRef, useState } from 'react'
import { uploadProfileImg } from '@/api/profileImgApi'

function MyPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [profileImg, setProfileImg] = useState<File | null>(null)
  const [imgSrc, setImgSrc]: any = useState(null)
  const [renderUserImg, setRenderUserImg] = useState<string | null>(null)

  //# 프로필 이미지 선택
  const handleProfileImg = () => {
    fileInputRef?.current?.click()
  }

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    console.log('선택된 파일:', selectedFile)
    setProfileImg(selectedFile || null)
  }

  //# 프로필 이미지 전송
  useEffect(() => {
    if (profileImg) {
      uploadProfileImg(profileImg)
      console.log('이미지 업로드')
    }
  }, [profileImg])

  //# 프로필 이미지 렌더링
  const renderProfileImg = async () => {}

  return (
    <Box>
      <ContentBox>
        <ProfileContain>
          <form action="#">
            <Image
              src={userImage}
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

const Formstyle = styled.form``

const Image = styled.img`
  width: 90px;
  height: 90px;
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

import styled from 'styled-components'
import searchImage from '@/assets/icon/Search.png'
import HomeImage from '@/assets/icon/Home.png'
import AddImage from '@/assets/icon/Add.png'
import LikeImage from '@/assets/icon/Like.png'
import UserImage from '@/assets/icon/User.png'

const StyledImage = styled.img.attrs({
  alt: '메인페이지'
})`
  width: 24px;
  height: 24px;
  border-radius: 50%;
`

const NavContain = styled.div`
  width: 100%;
  height: 56px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0 10px;
  position: fixed;
  bottom: 0;
  max-width: 370px;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  padding-top: 10px;
`

const WhiteSpace = styled.div`
  height: 21px;
  width: 100%;
`

function Nav() {
  return (
    <>
      <NavContain>
        <Wrapper>
          <StyledImage src={HomeImage} alt="메인 페이지" />
          <StyledImage src={searchImage} alt="검색 페이지" />
          <StyledImage src={AddImage} alt="글쓰기 페이지" />
          <StyledImage src={LikeImage} alt="좋아요 페이지" />
          <StyledImage src={UserImage} alt="마이 페이지" />
        </Wrapper>
        <WhiteSpace></WhiteSpace>
      </NavContain>
    </>
  )
}

export default Nav

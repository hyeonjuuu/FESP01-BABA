import styled from 'styled-components'
import UserIcon from '@/assets/icon/User.png'
import AddImage from '@/assets/icon/Add.png'
import HomeImage from '@/assets/icon/Home.png'
import LikeImage from '@/assets/icon/Like.png'
import ShopImage from '@/assets/icon/Shop.png'
import RealImage from '@/assets/icon/Reels.png'
import ShareImage from '@/assets/icon/Share.png'
import searchImage from '@/assets/icon/Search.png'

function Nav() {
  return (
    <>
      <NavContain>
        <MainLogo>BABA</MainLogo>
        <List>
          <Item>
            <Image src={HomeImage} alt="메인 페이지" />
            <ItemName>홈</ItemName>
          </Item>
          <Item>
            <Image src={searchImage} alt="검색 페이지" />
            <ItemName>검색</ItemName>
          </Item>
          <Item>
            <Image src={AddImage} alt="글쓰기 페이지" />
            <ItemName>만들기</ItemName>
          </Item>
          <Item>
            <Image src={LikeImage} alt="좋아요 페이지" />
            <ItemName>찜 목록</ItemName>
          </Item>
          <Item>
            <Image src={UserIcon} alt="프로필 페이지" />
            <ItemName>프로필</ItemName>
          </Item>
          <Item>
            <Image src={ShareImage} alt="마이 페이지" />
            <ItemName>메시지</ItemName>
          </Item>
          <Item>
            <Image src={RealImage} alt="마이 페이지" />
            <ItemName>릴스</ItemName>
          </Item>
          <Item>
            <Image src={ShopImage} alt="마이 페이지" />
            <ItemName>OTT</ItemName>
          </Item>
        </List>

        {/* <WhiteSpace></WhiteSpace> */}
      </NavContain>
    </>
  )
}

export default Nav

const NavContain = styled.div`
  width: 100%;
  height: 56px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 0;
  background-color: white;

  @media (min-width: 701px) {
    position: sticky;
    top: 0;
    left: 0;
    height: 100vh;
    width: 245px;
    padding: 10px 15px;
    background-color: tomato;
  }
  @media (min-width: 701px) and (max-width: 1260px) {
    width: 60px;
  }
`

const MainLogo = styled.h1`
  width: 103px;
  height: 30px;
  margin-left: 12px;
  @media (max-width: 700px) {
    display: none;
  }
  @media (min-width: 700px) and (max-width: 1260px) {
    width: 60px;
    font-size: 18px;
    margin: 0;
    text-align: center;
  }
`

const Image = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
`

const List = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 0 auto;
  /* padding: 10px 15px; */
  padding: 0;
  @media (max-width: 700px) {
    justify-content: space-between;
  }
  @media (min-width: 701px) {
    flex-direction: column;
    padding: 0;
  }
`

const Item = styled.li`
  display: flex;
  align-items: center;
  height: 100%;
  flex: 1;
  @media (max-width: 700px) {
    display: flex;
    justify-content: center;
    &:nth-child(n + 6) {
      display: none;
    }
  }
  @media (min-width: 701px) {
    width: 220px;
    height: 48px;
    padding: 12px;
    gap: 16px;
  }
`

const ItemName = styled.span`
  @media (max-width: 1260px) {
    display: none;
  }
`

// const WhiteSpace = styled.div`
//   height: 21px;
//   width: 100%;
// `

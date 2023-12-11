import Logo from '@/components/Logo'
import styled from 'styled-components'
import Button from '@/components/Button'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <HomeDivWrapper>
      <SrOnlyH1>홈</SrOnlyH1>
      <Link to="/">
        <Logo />
      </Link>
      <ButtonDivWrapper>
        <StyledLink to="/login">
          <Button text="로그인" />
        </StyledLink>
        <StyledLink to="/signUp">
          <Button $bgcolor="#F8F8F8" color="#303032" text="회원가입" />
        </StyledLink>
      </ButtonDivWrapper>
    </HomeDivWrapper>
  )
}

export default Home

const SrOnlyH1 = styled.h1`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`

const HomeDivWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
`

const ButtonDivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const StyledLink = styled(Link)`
  width: 100%;
  max-width: 360px;
  height: 48px;
  margin: 10px 0;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
`

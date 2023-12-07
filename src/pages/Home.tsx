import Logo from '@/components/Logo'
import styled from 'styled-components'
import Button from '@/components/Button'

function Home() {
  return (
    <HomeDivWrapper>
      <SrOnlyH1>홈</SrOnlyH1>
      <Logo />
      <ButtonDivWrapper>
        <Button text="로그인" />
        <Button $bgcolor="#F8F8F8" color="#303032" text="회원가입" />
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

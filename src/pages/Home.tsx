import Button from '@/components/Button'
import React from 'react'
import styled from 'styled-components'

function Home() {
  return (
    <HomeDivWrapper>
      <h1>로고</h1>
      <ButtonDivWrapper>
        <Button text="로그인" />
        <Button bgColor="#F8F8F8" color="#303032" text="회원가입" />
      </ButtonDivWrapper>
    </HomeDivWrapper>
  )
}

export default Home

const HomeDivWrapper = styled.div`
  width: 390px;
  margin: auto;
`

const ButtonDivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

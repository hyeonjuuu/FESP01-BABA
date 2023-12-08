import Nav from '@/layout/Nav'
import Fake from '@/layout/Fake'
import Header from '@/layout/Header'
import styled from 'styled-components'
import { Outlet } from 'react-router-dom'

export default function RootLayout() {
  return (
    <>
      <MainWrapper>
        <Header />
        <Outlet />
        <Fake />
        <Nav />
      </MainWrapper>
    </>
  )
}

const MainWrapper = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

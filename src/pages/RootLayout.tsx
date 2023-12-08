import Nav from '@/layout/Nav'
import Fake from '@/layout/Fake'
import Header from '@/layout/Header'
import styled from 'styled-components'
import { Outlet, useLocation } from 'react-router-dom'

export default function RootLayout() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  return (
    <>
      <MainWrapper>
        <Header isHome={isHome} />
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

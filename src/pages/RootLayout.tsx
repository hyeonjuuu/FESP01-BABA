import Nav from '@/layout/Nav'
import Header from '@/layout/Header'
import styled from 'styled-components'
import SideBar from '@/layout/SideBar'
import GlobalStyle from '@/style/GlobalStyle'
import { Outlet, useLocation, useMatch } from 'react-router-dom'
import Fake from '@/layout/Fake'

export default function RootLayout() {
  const location = useLocation()

  // const isHome = location.pathname === '/'
  const match = useMatch('/')
  const isHome = match !== null

  return (
    <>
      <GlobalStyle />
      <MainContainer>
        <Header isHome={isHome} />
        <Nav />
        <Outlet />

        {location.pathname === '/main' ? <SideBar /> : ''}
        <ResponsiveFake />
      </MainContainer>
    </>
  )
}

const MainContainer = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 400px;
  @media (min-width: 1031px) {
    align-items: normal;
    display: grid;
    grid-template-columns: 1fr 4fr 1.5fr;
  }
  @media (min-width: 701px) and (max-width: 1030px) {
    align-items: normal;
    display: grid;
    grid-template-columns: 1fr 7fr;
  }
`

const ResponsiveFake = styled(Fake)`
  display: none;

  @media (max-width: 700px) {
    display: block;
  }
`

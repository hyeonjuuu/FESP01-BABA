import Nav from '@/layout/Nav'
// import Fake from '@/layout/Fake'
import Header from '@/layout/Header'
import styled from 'styled-components'
import SideBar from '@/layout/SideBar'
import GlobalStyle from '@/style/GlobalStyle'
import { Outlet, useLocation, useMatch } from 'react-router-dom'
import CastContainer from '@/components/movieInfo/CastContainer'

export default function RootLayout() {
  const location = useLocation()

  const match = useMatch('/')
  const isHome = match !== null

  return (
    <>
      <GlobalStyle />
      <MainContainer>
        {/* <Header isHome={isHome} />
        <Nav />
        <Outlet />

        {location.pathname === '/main' ? <SideBar /> : ''}
        {location.pathname === '/search' ? <SideBar /> : ''}
        {location.pathname.startsWith('/info') ? <CastContainer /> : ''} */}
        <Outlet />
      </MainContainer>
    </>
  )
}

const MainContainer = styled.main``

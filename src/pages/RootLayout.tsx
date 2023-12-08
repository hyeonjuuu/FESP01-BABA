import Nav from '@/layout/Nav'
import Header from '@/layout/Header'
import styled from 'styled-components'
import { Outlet } from 'react-router-dom'
import GlobalStyle from '@/style/GlobalStyle'

export default function RootLayout() {
  return (
    <>
      <GlobalStyle />
      <MainContainer>
        <Header />
        <Nav />
        <Outlet />
      </MainContainer>
    </>
  )
}

const MainContainer = styled.main`
  @media (min-width: 391px) {
    display: grid;
    grid-template-columns: 1fr 4fr 1.5fr;
    /* grid-template-rows: 1fr; */
    height: 100vh;
  }
`

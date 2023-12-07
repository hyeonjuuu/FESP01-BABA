import Nav from '@/layout/Nav'
import Header from '@/layout/Header'
import { Outlet } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import Fake from '@/layout/Fake'

const GlobalStyle = createGlobalStyle`
  body, #root {
    margin: 0;
    padding: 0;
  }
`

export default function RootLayout() {
  return (
    <>
      <GlobalStyle />
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

import Nav from '@/layout/Nav'
import Header from '@/layout/Header'
import { Outlet } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'

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
      <main>
        <Header />
        <Outlet />
        <Nav />
      </main>
    </>
  )
}

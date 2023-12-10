import router from '../routes'
import { Suspense } from 'react'
import GlobalStyle from './style/GlobalStyle'
import useThemeStore from './store/useThemeStore'
import { ThemeProvider } from 'styled-components'
import { RouterProvider } from 'react-router-dom'

function App() {
  const { darkMode } = useThemeStore()

  const theme = {
    bgColor: darkMode ? '#1E1E1E' : '#FFFFFF',
    color: darkMode ? '#FFFFFF' : '#1E1E1E',
    borderColor: darkMode ? '#ffffff' : '##C6C6C6'
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {/* 로딩화면 추현해야함 */}
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </ThemeProvider>
    </>
  )
}

export default App

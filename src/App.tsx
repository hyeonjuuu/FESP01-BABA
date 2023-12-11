import router from '../routes'
import { Suspense } from 'react'
import GlobalStyle from './style/GlobalStyle'
import useThemeStore from './store/useThemeStore'
import { ThemeProvider } from 'styled-components'
import { RouterProvider } from 'react-router-dom'

function App() {
  const { $darkMode } = useThemeStore()

  const theme = {
    bgColor: $darkMode ? '#1E1E1E' : '#FFFFFF',
    color: $darkMode ? '#FFFFFF' : '#303032'
  }

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <RouterProvider router={router} />
        </ThemeProvider>
      </Suspense>
    </>
  )
}

export default App

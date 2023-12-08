import router from '../routes'
import GlobalStyle from './style/GlobalStyle'
import { ThemeProvider } from 'styled-components'
import useThemeStore from './store/useThemeStore'
import { RouterProvider } from 'react-router-dom'

function App() {
  const { darkMode } = useThemeStore()

  const theme = {
    bgColor: darkMode ? '#1E1E1E' : '#FFFFFF',
    color: darkMode ? '#FFFFFF' : '#303032'
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  )
}

export default App

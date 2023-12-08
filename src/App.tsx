import { ThemeProvider } from 'styled-components'
import router from '../routes'
import useThemeStore from './store/useThemeStore'
import GlobalStyle from './style/GlobalStyle'
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
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  )
}

export default App

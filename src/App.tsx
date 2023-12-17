import router from '../routes'
import { Suspense } from 'react'
import GlobalStyle from './style/GlobalStyle'
import useThemeStore from './store/useThemeStore'
import { ThemeProvider } from 'styled-components'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  const { $darkMode } = useThemeStore()

  const theme = {
    bgColor: $darkMode ? '#1E1E1E' : '#FFFFFF',
    color: $darkMode ? '#FFFFFF' : '#303032'
  }

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  })

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <RouterProvider router={router} />
            <ReactQueryDevtools />
          </ThemeProvider>
        </QueryClientProvider>
      </Suspense>
    </>
  )
}

export default App

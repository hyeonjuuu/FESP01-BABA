import router from '../routes'
import { RouterProvider } from 'react-router-dom'
import GlobalStyle from './style/GlobalStyle'

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App

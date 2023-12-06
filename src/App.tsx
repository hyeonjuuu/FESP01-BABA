import router from '../routes'
import { RouterProvider } from 'react-router-dom'

function App() {
  return (
    <>
      {/* <Router>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="detail/:id" element={<Detail />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router> */}
      <RouterProvider router={router} />
    </>
  )
}

export default App

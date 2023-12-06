// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import router from '../routes'
import './App.css'
import Home from './pages/Home'
import Detail from './pages/Detail'
import NotFound from './pages/NotFound'
import RootLayout from './pages/RootLayout'
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

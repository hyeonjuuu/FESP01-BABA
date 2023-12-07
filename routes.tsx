import React from 'react'
import { lazy } from 'react'
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route
} from 'react-router-dom'

const RootLayout: React.LazyExoticComponent<() => React.JSX.Element> = lazy(
  () => import('./src/pages/RootLayout')
)
const Home: React.LazyExoticComponent<() => React.JSX.Element> = lazy(
  () => import('./src/pages/Home')
)
const Login: React.LazyExoticComponent<() => React.JSX.Element> = lazy(
  () => import('./src/pages/Login')
)
const SignUp: React.LazyExoticComponent<() => React.JSX.Element> = lazy(
  () => import('./src/pages/SignUp')
)
const Detail: React.LazyExoticComponent<() => React.JSX.Element> = lazy(
  () => import('./src/pages/Detail')
)
const NotFound: React.LazyExoticComponent<() => React.JSX.Element> = lazy(
  () => import('./src/pages/NotFound')
)

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signUp" element={<SignUp />} />
      {/* <Route path="detail/:id" element={<Detail />} /> */}
      <Route path="detail" element={<Detail />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
)

export default router

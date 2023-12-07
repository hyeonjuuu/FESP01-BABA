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
const Detail: React.LazyExoticComponent<() => React.JSX.Element> = lazy(
  () => import('./src/pages/Detail')
)
const NotFound: React.LazyExoticComponent<() => React.JSX.Element> = lazy(
  () => import('./src/pages/NotFound')
)
const SearchPage: React.LazyExoticComponent<() => React.JSX.Element> = lazy(
  () => import('./src/pages/SearchPage')
)
const Writing: React.LazyExoticComponent<() => React.JSX.Element> = lazy(
  () => import('./src/pages/Writing')
)
const MyPage: React.LazyExoticComponent<() => React.JSX.Element> = lazy(
  () => import('./src/pages/MyPage')
)

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="*" element={<NotFound />} />
      <Route path="detail/:id" element={<Detail />} />
      <Route path="search" element={<SearchPage />} />
      <Route path="writing" element={<Writing />} />
      <Route path="mypage" element={<MyPage />} />
    </Route>
  )
)

export default router

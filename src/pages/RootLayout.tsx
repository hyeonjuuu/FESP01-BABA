import Header from '@/layout/Header'
import { Outlet } from 'react-router-dom'

export default function RootLayout() {
  return (
    <>
      <main>
        <Header />
        <Outlet />
      </main>
    </>
  )
}

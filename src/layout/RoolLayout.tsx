import { Outlet } from 'react-router-dom'
import Header from './Header'

const RootLayout = (): JSX.Element => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

export default RootLayout

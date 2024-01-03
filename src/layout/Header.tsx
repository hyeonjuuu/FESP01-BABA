import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import useThemeStore from '../store/useThemeStore'
import DarkModeToggleIcon from '@/components/DarkModeIcon'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../assets/logo.svg'
import Search from '../components/search/Search'
import SearchResultBar from './../components/search/SearchResultBar'
import AuthButton from './../components/main/AuthButton'

interface HeaderDivProps {
  $darkMode: boolean
}

interface ArrowDivProps {
  $isHome: boolean
}

const Header = () => {
  const { $darkMode, toggleDarkMode } = useThemeStore()
  // const navigate = useNavigate()

  // const handleGoBack = () => {
  //   navigate(-1)
  // }

  return (
    <>
      <HeaderContainer $darkMode={$darkMode}>
        <MenuButton>Home</MenuButton>
        <MenuButton>Search</MenuButton>
        <MenuButton>Sign in</MenuButton>
        <MenuButton>Join</MenuButton>
      </HeaderContainer>
    </>
  )
}

export default Header

const HeaderContainer = styled.div<HeaderDivProps>`
  height: 72px;
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 0 52px;
`

const MenuButton = styled.button`
  background-color: green;
  width: 100px;
`

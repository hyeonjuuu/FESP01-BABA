import styled, { keyframes } from 'styled-components'
import useThemeStore from '../store/useThemeStore'

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
  justify-content: flex-end;
`
const fillcolor = keyframes`
  0% {
    background-position: 0 0%;
  }
  100% {
    background-position: 0 100%;
  }
`

const MenuButton = styled.button`
  background: linear-gradient(to bottom, transparent 50%, #aaeec4 50%);
  background-size: 100% 200%;
  transition: all 0.5s;

  &:hover {
    animation: ${fillcolor} 0.5s forwards;
  }
`

import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import useThemeStore from '../store/useThemeStore'
import DarkModeToggleIcon from '@/components/DarkModeIcon'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../assets/logo.svg'

interface HeaderDivProps {
  $darkMode: boolean
}

interface ArrowDivProps {
  $isHome: boolean
}

const Header = ({ isHome }: { isHome: boolean }) => {
  const { $darkMode, toggleDarkMode } = useThemeStore()
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <>
      <HeaderContainer $darkMode={$darkMode}>
        <BackButton $isHome={isHome} onClick={handleGoBack}>
          <StyledFontAwesomeIcon icon={faArrowLeft} />
        </BackButton>
        <Logo src={logo} alt="" />
        <DarkModeToggleIcon
          $isDarkMode={$darkMode}
          toggleDarkModeAni={toggleDarkMode}
        />
      </HeaderContainer>
    </>
  )
}

export default Header

const HeaderContainer = styled.div<HeaderDivProps>`
  min-width: 400px;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 10px 30px;
  align-items: center;
  background-color: ${({ $darkMode }) => ($darkMode ? '#121212' : '#ffffff')};
  border-bottom: 1px solid ${({ $darkMode }) => ($darkMode ? '#333' : '#ddd')};
  color: ${({ $darkMode }) => ($darkMode ? '#ffffff' : '#333')};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (min-width: 701px) {
    display: none;
  }
`

const BackButton = styled.div<ArrowDivProps>`
  visibility: ${({ $isHome }) => ($isHome ? 'hidden' : 'visible')};
  cursor: pointer;
`

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: 20px;
`

const Logo = styled.img`
  width: 100px;
  height: 45px;
`

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
        {/* <BackButton $isHome={isHome} onClick={handleGoBack}>
          <StyledFontAwesomeIcon icon={faArrowLeft} />
        </BackButton>
        <DarkModeToggleIcon
        $isDarkMode={$darkMode}
        toggleDarkModeAni={toggleDarkMode}
      /> */}
        <Logo src={logo} alt="" />
        <Search />
        <AuthButton text="로그인" color="#222222" backgroundColor="#AAEEC4" />
        <AuthButton
          text="회원가입"
          color="none"
          backgroundColor="transperate"
        />
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

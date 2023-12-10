import useThemeStore from '@/store/useThemeStore'
import styled, { ThemeProvider } from 'styled-components'
import DarkModeToggleIcon from '@/components/DarkModeIcon'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Header() {
  const { darkMode, toggleDarkMode } = useThemeStore()

  return (
    <ThemeProvider theme={{ bgColor: darkMode ? '#1E1E1E' : '#FFFFFF' }}>
      <HeaderDiv>
        <ArrowDiv>
          <FontAwesomeIcon icon={faAngleLeft} />
        </ArrowDiv>

        <UserName>h0_ri</UserName>

        <Wrapper>
          <DarkModeToggleIcon
            isDarkMode={darkMode}
            toggleDarkModeAni={toggleDarkMode}
          />
        </Wrapper>
      </HeaderDiv>
    </ThemeProvider>
  )
}

export default Header

const HeaderDiv = styled.div`
  width: 100%;
  height: 55px;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: ${props => props.theme.bgColor};
  min-width: 390px;
  @media (min-width: 700px) {
    display: none;
  }
`

const ArrowDiv = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 35px;
  flex: 1;
  padding-left: 18px;
`

const UserName = styled.h5`
  font-weight: 700;
  font-size: x-large;
  margin: 0;
  flex: 1;
`
const Wrapper = styled.div`
  padding-right: 18px;
`

import useThemeStore from '@/store/useThemeStore'
import styled from 'styled-components'
import darkModeIcon from '@/assets/icon/Darkmode.svg'
import lightModeIcon from '@/assets/icon/Lightmode.svg'

interface ButtonProps {
  size?: string
  darkMode?: boolean
}

function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useThemeStore()

  return (
    <ModeButton onClick={toggleDarkMode}>
      <ScreenMode src={darkMode ? lightModeIcon : darkModeIcon} size="22px" />
    </ModeButton>
  )
}

export default DarkModeToggle

const ModeButton = styled.button`
  box-sizing: border-box;
  border: none;
  outline: none;
  background-color: inherit;
  cursor: pointer;

  align-self: flex-start;
  display: flex;
  padding: 0;
`

const ScreenMode = styled.img<ButtonProps>`
  width: 22px;
  height: 22px;
  /* color: ${({ darkMode }) => (darkMode === true ? '#777777' : '#FFFFFF')}; */
`

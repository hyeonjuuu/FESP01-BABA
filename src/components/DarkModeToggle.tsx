import styled from 'styled-components'
import darkModeIcon from '@/assets/icon/darkMode.svg'
import lightModeIcon from '@/assets/icon/Lightmode.svg'
import useThemeStore from '@/store/useThemeStore'

interface ButtonProps {
  size?: string
  darkMode?: boolean
}

function darkModeToggle() {
  const { $darkMode, toggleDarkMode } = useThemeStore()

  return (
    <ButtonStyle onClick={toggleDarkMode}>
      <ScreenMode src={$darkMode ? lightModeIcon : darkModeIcon} size="22px" />
    </ButtonStyle>
  )
}

export default darkModeToggle

const ButtonStyle = styled.button`
  border-radius: 50%;
  padding: 5px;
`

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

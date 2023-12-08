import useThemeStore from '@/store/useThemeStore'
import styled from 'styled-components'
import darkModeIcon from '@/assets/icon/Darkmode.svg'
import lightModeIcon from '@/assets/icon/Lightmode.svg'

interface SizeProps {
  size?: string
}

function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useThemeStore()

  return (
    <button onClick={toggleDarkMode}>
      <ScreenMode src={darkMode ? lightModeIcon : darkModeIcon} size="22px" />
    </button>
  )
}

export default DarkModeToggle

const ScreenMode = styled.img<SizeProps>`
  width: 22px;
  height: 22px;
`

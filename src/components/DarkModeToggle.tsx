import useThemeStore from '@/store/useThemeStore'
import styled from 'styled-components'
import darkModeIcon from '@/assets/icon/darkMode.svg'
import lightModeIcon from '@/assets/icon/Lightmode.svg'

interface SizeProps {
  size?: string
}

function darkModeToggle() {
  const { $darkMode, toggleDarkMode } = useThemeStore()

  return (
    <button onClick={toggleDarkMode}>
      <ScreenMode src={$darkMode ? lightModeIcon : darkModeIcon} size="22px" />
    </button>
  )
}

export default darkModeToggle

const ScreenMode = styled.img<SizeProps>`
  width: 22px;
  height: 22px;
`

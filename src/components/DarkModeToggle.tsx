import styled from 'styled-components'
import useThemeStore from '@/store/useThemeStore'
import darkModeIcon from '@/assets/icon/Darkmode.svg'
import lightModeIcon from '@/assets/icon/Lightmode.svg'

interface SizeProps {
  size?: string
}

function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useThemeStore()

  return (
    <Btn onClick={toggleDarkMode}>
      <ScreenMode src={darkMode ? lightModeIcon : darkModeIcon} size="22px" />
    </Btn>
  )
}

export default DarkModeToggle

const Btn = styled.button`
  border-radius: 50%;
  width: 45px;
  height: 45px;
`

const ScreenMode = styled.img<SizeProps>`
  width: 22px;
  height: 22px;
`

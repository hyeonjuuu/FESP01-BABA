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

const ScreenMode = styled.img<SizeProps>`
  width: 18px;
  height: 18px;
`

import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'

interface DarkModeToggleIconProps {
  $isDarkMode: boolean
  toggleDarkModeAni: () => void
}

const DarkModeToggleIcon = ({
  $isDarkMode,
  toggleDarkModeAni
}: DarkModeToggleIconProps) => {
  const iconSpring = useSpring({
    opacity: $isDarkMode ? 0.5 : 1,
    transform: $isDarkMode ? 'scale(1.2)' : 'scale(1)',
    borderColor: $isDarkMode ? 'tomato' : 'rgba(0, 0, 0, 0.8)',
    borderWidth: $isDarkMode ? '2px' : '1px'
  })

  return (
    <Wrapper onClick={toggleDarkModeAni} $isDarkMode={$isDarkMode}>
      <animated.div style={{ ...iconSpring }}>
        <FontAwesomeIcon icon={$isDarkMode ? faSun : faMoon} />
      </animated.div>
    </Wrapper>
  )
}

export default DarkModeToggleIcon

const Wrapper = styled.div<{ $isDarkMode: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border-style: solid;
  cursor: pointer;
  font-size: 20px;
  color: ${props => (props.$isDarkMode ? 'white' : 'black')};
`

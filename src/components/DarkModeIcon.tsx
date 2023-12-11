import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'

interface DarkModeToggleIconProps {
  $isdarkmode: boolean
  toggleDarkModeAni: () => void
}

const DarkModeToggleIcon = ({
  $isdarkmode,
  toggleDarkModeAni
}: DarkModeToggleIconProps) => {
  const iconSpring = useSpring({
    opacity: $isdarkmode ? 0.5 : 1,
    transform: $isdarkmode ? 'scale(1.2)' : 'scale(1)',
    borderColor: $isdarkmode ? 'tomato' : 'rgba(0, 0, 0, 0.8)',
    borderWidth: $isdarkmode ? '2px' : '1px'
  })

  return (
    <Wrapper onClick={toggleDarkModeAni} $isdarkmode={$isdarkmode}>
      <animated.div style={{ ...iconSpring }}>
        <FontAwesomeIcon icon={$isdarkmode ? faMoon : faSun} />
      </animated.div>
    </Wrapper>
  )
}

export default DarkModeToggleIcon

const Wrapper = styled.div<{ $isdarkmode: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border-style: solid;
  cursor: pointer;
  font-size: 20px;
  color: ${props => (props.$isdarkmode ? 'white' : 'black')};
`

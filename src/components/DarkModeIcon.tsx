import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'
import moon from '@/assets/moonImage.png'
import sun from '@/assets/lightIcon.png'

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
      <IconWrapper style={iconSpring}>
        <Img src={$isDarkMode ? sun : moon} alt="" $isDarkMode={$isDarkMode} />
        <ButtonText>{$isDarkMode ? 'Light' : 'Dark'}</ButtonText>
      </IconWrapper>
    </Wrapper>
  )
}

export default DarkModeToggleIcon

const Wrapper = styled.div<{ $isDarkMode: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 74px;
  height: 74px;
  border-radius: 50%;
  cursor: pointer;

  background-color: ${props => (props.$isDarkMode ? '#1E1E1E' : '#FFF')};
  box-shadow:
    -1px -3px 15px rgba(255, 255, 255, 0.5),
    10px 10px 15px rgba(70, 70, 70, 0.12);
  transition: background-color 0.3s;
  /* border: 1.5px solid
    ${props => (props.$isDarkMode ? '#FFF' : 'rgba(0, 0, 0, 0.8)')}; */

  &:hover {
    background-color: ${props => (props.$isDarkMode ? '#343434' : '#F5F5F5')};
  }
`

const IconWrapper = styled(animated.div)`
  font-size: 20px;
  color: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ButtonText = styled.span`
  margin-top: 5px;
  font-size: 12px;
  font-weight: 600;
`

const Img = styled.img<{ $isDarkMode: boolean }>`
  width: 30px;
  height: 30px;
  filter: ${props =>
    props.$isDarkMode
      ? 'invert(85%) sepia(1) saturate(1000%) hue-rotate(295deg) brightness(110%) contrast(100%)'
      : 'none'};
  transition: filter 0.3s;

  &:hover {
    filter: ${props =>
      props.$isDarkMode
        ? 'invert(60%) sepia(1) saturate(1000%) hue-rotate(295deg) brightness(110%) contrast(100%)'
        : 'brightness(80%)'};
  }
`

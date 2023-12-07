import styled from 'styled-components'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import darkmode from '@/assets/icon/Darkmode.svg'
import lightmode from '@/assets/icon/Lightmode.svg'

interface SizeProps {
  size?: string
}
function Header() {
  return (
    <HeaderDiv>
      <ArrowDiv>
        <FontAwesomeIcon icon={faAngleLeft} />
        <ScreenMode src={darkmode} alt="" size="18px" />
        <ScreenMode src={lightmode} alt="" size="20px" />
      </ArrowDiv>
    </HeaderDiv>
  )
}

export default Header

const HeaderDiv = styled.div`
  width: 100%;
  max-width: 370px;
`

const ArrowDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 10px;
  border-bottom: 2px solid black;
`
const ScreenMode = styled.img<SizeProps>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`

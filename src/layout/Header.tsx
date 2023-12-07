import styled from 'styled-components'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Header() {
  return (
    <HeaderDiv>
      <ArrowDiv>
        <FontAwesomeIcon icon={faAngleLeft} />
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

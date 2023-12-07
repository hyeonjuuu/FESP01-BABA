import styled from 'styled-components'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Header() {
  return (
    <ArrowDiv>
      <FontAwesomeIcon icon={faAngleLeft} />
    </ArrowDiv>
  )
}

export default Header

const ArrowDiv = styled.div`
  width: 100vw;
  display: flex;
  justify-content: start;
  border-bottom: 2px solid black;
  padding-bottom: 10px;
`

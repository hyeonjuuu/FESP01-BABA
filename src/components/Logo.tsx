import styled from 'styled-components'
import logo from '../assets/logo.svg'

function Logo() {
  return (
    <LogoDiv>
      <img src={logo} alt="바바" width="100%"></img>
    </LogoDiv>
  )
}

export default Logo

const LogoDiv = styled.div`
  width: 100%;
  max-width: 310px;
  height: 80px;
  margin: 30px auto;
`

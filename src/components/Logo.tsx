import styled from 'styled-components'

function Logo() {
  return <LogoDiv>로고</LogoDiv>
}

export default Logo

const LogoDiv = styled.div`
  width: 100%;
  max-width: 310px;
  height: 80px;
  border: 1px solid black;
  border-radius: 5px;
  margin: 30px auto;
`

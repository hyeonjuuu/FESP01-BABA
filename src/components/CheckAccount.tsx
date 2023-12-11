import styled from 'styled-components'

interface CheckAccountProps {
  text1: string
  text2: string
}

function CheckAccount({ text1, text2 }: CheckAccountProps) {
  return (
    <CheckAccountButton>
      {text1}
      <TextSpan>{text2}</TextSpan>
    </CheckAccountButton>
  )
}

export default CheckAccount

const CheckAccountButton = styled.button`
  background: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 360px;
  margin-top: 40px;
  height: 80px;
  border: 1.5px solid #bcbcbc;
  border-radius: 5px;
  color: #bcbcbc;
  font-size: 16px;
`

const TextSpan = styled.span`
  color: #28c7c7;
  text-decoration: none;
`

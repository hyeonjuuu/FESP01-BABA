import React from 'react'
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
  gap: 5px;
  justify-content: center;
  align-items: center;
  width: 260px;
  padding-left: 10px;
  margin: auto;
  margin-top: 40px;
  height: 80px;
  border: 1px solid #bcbcbc;
  border-radius: 5px;
  color: #bcbcbc;
`

const TextSpan = styled.span`
  color: #28c7c7;
`

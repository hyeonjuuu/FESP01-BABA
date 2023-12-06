import React from 'react'
import styled from 'styled-components'

interface ButtonProps {
  bgColor?: string
  color?: string
  text?: string
}

function Button({ bgColor = '#303032', color = '#46F3F3', text }: ButtonProps) {
  return (
    <BtnButton bgColor={bgColor} color={color}>
      {text}
    </BtnButton>
  )
}

export default Button

const BtnButton = styled.button<ButtonProps>`
  width: 310px;
  height: 48px;
  margin-bottom: 20px;
  background-color: ${props => props.bgColor};
  color: ${props => props.color};
`

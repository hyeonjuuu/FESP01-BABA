import styled from 'styled-components'

interface ButtonProps {
  type?: string
  $bgcolor?: string
  color?: string
  text?: string
}

function Button({
  type = 'button',
  $bgcolor = '#303032',
  color = '#46F3F3',
  text
}: ButtonProps) {
  return (
    <BtnButton type={type} $bgcolor={$bgcolor} color={color}>
      {text}
    </BtnButton>
  )
}

export default Button

const BtnButton = styled.button<ButtonProps>`
  width: 100%;
  max-width: 310px;
  height: 48px;
  margin-bottom: 20px;
  background-color: ${props => props.$bgcolor};
  color: ${props => props.color};
  border: 0.5px solid black;
  border-radius: 5px;
  font-family: 'GmarketSans';
  font-size: 16px;
`

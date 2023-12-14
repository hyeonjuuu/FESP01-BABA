import styled from 'styled-components'

interface ButtonProps {
  type?: string
  $bgcolor?: string
  color?: string
  text?: string
  width?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

function Button({
  type = 'button',
  $bgcolor = '#303032',
  color = '#46F3F3',
  text,
  width = '100%',
  onClick
}: ButtonProps) {
  return (
    <BtnButton
      type={type}
      $bgcolor={$bgcolor}
      color={color}
      width={width}
      onClick={onClick}
    >
      {text}
    </BtnButton>
  )
}

export default Button

const BtnButton = styled.button<ButtonProps>`
  width: ${props => props.width || '100%'};
  height: 48px;
  margin: 20px 0;
  background-color: ${props => props.$bgcolor};
  color: ${props => props.color};
  border: 0.5px solid black;
  border-radius: 5px;
  font-family: 'GmarketSans';
  font-size: 16px;
`

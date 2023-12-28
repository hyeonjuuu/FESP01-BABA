import styled, { css } from 'styled-components'

interface AuthButtonProps {
  text: string
  color: string
  backgroundColor: string
}

const AuthButton: React.FC<AuthButtonProps> = ({
  text,
  color,
  backgroundColor
}) => {
  return (
    <AutoButtonStyle color={color} backgroundColor={backgroundColor}>
      {text}
    </AutoButtonStyle>
  )
}

export default AuthButton

const LoginHoverStyle = css`
  background-color: #222222;
  color: white;
  transition: 0.5s ease;
`
const SigninHoverStyle = css`
  background-color: #222222;
  color: #aaeec4;
  transition: 0.5s ease;
`

const AutoButtonStyle = styled.button<{ backgroundColor: string }>`
  color: ${props => props.color || 'white'};
  background-color: ${props => props.backgroundColor || '#222222'};
  width: 94px;
  height: 46px;
  border-radius: 8px;
  border: 1px solid #5d5d5d;
  box-sizing: border-box;
  font-size: 14px;

  &:hover {
    ${props =>
      props.backgroundColor === 'transperate'
        ? LoginHoverStyle
        : SigninHoverStyle}
  }
`

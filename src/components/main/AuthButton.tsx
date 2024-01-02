import styled, { css } from 'styled-components'

interface AuthButtonProps {
  text: string
  color: string
  backgroundcolor: string
}

const AuthButton: React.FC<AuthButtonProps> = ({
  text,
  color,
  backgroundcolor
}) => {
  return (
    <AutoButtonStyle color={color} backgroundcolor={backgroundcolor}>
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

const AutoButtonStyle = styled.button<{ backgroundcolor: string }>`
  color: ${props => props.color || 'white'};
  background-color: ${props => props.backgroundcolor || '#222222'};
  width: 94px;
  height: 46px;
  border-radius: 8px;
  border: 1px solid #5d5d5d;
  box-sizing: border-box;
  font-size: 14px;

  &:hover {
    ${props =>
      props.backgroundcolor === 'transperate'
        ? LoginHoverStyle
        : SigninHoverStyle}
  }
`

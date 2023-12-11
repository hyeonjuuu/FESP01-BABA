import { useState } from 'react'
import { StyledLink } from './Home'
import Logo from '@/components/Logo'
import styled from 'styled-components'
import Input from '@/components/Input'
import { HTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
import Button from '@/components/Button'
import CheckAccount from '@/components/CheckAccount'
import { faEye } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SignUpWrapperDiv, SrOnlyH2, FormWrapper } from '@/pages/SignUp'

interface PasswordInputProps extends HTMLAttributes<HTMLDivElement> {
  inputColor?: boolean
}

function Login() {
  const [inputColor, setInputColor] = useState(false)

  const handleInputColorChange = () => {
    setInputColor(prevFocus => !prevFocus)
  }

  return (
    <SignUpWrapperDiv>
      <SrOnlyH2>로그인</SrOnlyH2>
      <LogoWrapper>
        <StyledLink to="/">
          <Logo />
        </StyledLink>
      </LogoWrapper>
      <LoginFormWrapper>
        <InputWrapper>
          <label htmlFor="email"></label>
          <Input id="email" type="input" placeholder="이메일" width="345px" />
          <label htmlFor="=password"></label>
          <PasswordInputWrapper inputColor={inputColor}>
            <PasswordInput
              id="password"
              type="password"
              placeholder="패스워드"
              width={'345px'}
              onFocus={handleInputColorChange}
            />
            <HideBtn type="button">
              <FontAwesomeIcon icon={faEye} />
            </HideBtn>
          </PasswordInputWrapper>
        </InputWrapper>
        <StyledLink to="/main">
          <Button type="submit" text="로그인" width="360px" />
        </StyledLink>

        <Button
          $bgcolor="#FFDC00"
          color="#1E1E1E"
          text="KaKao 로그인"
          width="360px"
        />
      </LoginFormWrapper>
      <Link to="/signup">
        <CheckAccount text1="계정이 없으신가요?" text2="가입하기" />
      </Link>
    </SignUpWrapperDiv>
  )
}

export default Login

const LogoWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  width: 100%;
`

const LoginFormWrapper = styled(FormWrapper)`
  border-top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const InputWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`

const HideBtn = styled.button`
  width: 10%;
  border: none;
  background-color: white;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const PasswordInputWrapper = styled.div<PasswordInputProps>`
  max-width: 360px;
  display: flex;
  border: 1.5px solid
    ${({ inputColor }) => (inputColor ? '#3797EF' : '#bcbcbc')};
  border-radius: 5px;
  transition: border-color 0.3s ease;
`

const PasswordInput = styled.input`
  width: ${props => props.width || '100%'};
  height: 44px;
  border: none;
  border-radius: 5px;
  padding-left: 10px;

  &::placeholder {
    color: #bcbcbc;
    font-family: 'GmarketSans';
  }
  &:focus {
    outline: none;
    border-color: #3797ef;
  }
`

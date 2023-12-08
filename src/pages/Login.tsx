import Logo from '@/components/Logo'
import styled from 'styled-components'
import Input from '@/components/Input'
import Button from '@/components/Button'
import CheckAccount from '@/components/CheckAccount'
import { faEye } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SignUpWrapperDiv, SrOnlyH2, FormWrapper } from '@/pages/SignUp'

function Login() {
  return (
    <SignUpWrapperDiv>
      <SrOnlyH2>로그인</SrOnlyH2>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <LoginFormWrapper>
        <InputWrapper>
          <label htmlFor="email"></label>
          <Input id="email" type="input" placeholder="이메일" />
          <label htmlFor="=password"></label>
          <Input id="password" type="password" placeholder="패스워드" />
          <EyeDiv>
            <FontAwesomeIcon icon={faEye} />
          </EyeDiv>
        </InputWrapper>

        <Button type="submit" text="로그인" />
        <Button $bgcolor="#FFDC00" color="#1E1E1E" text="KaKao 로그인" />
      </LoginFormWrapper>
      <CheckAccount text1="계정이 없으신가요?" text2="가입하기" />
    </SignUpWrapperDiv>
  )
}

export default Login

const LogoWrapper = styled.div`
  margin-bottom: -40px;
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
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const EyeDiv = styled.div`
  position: absolute;
  right: 0px;
  top: 65px;
  width: 30px;
  height: 30px;
`

import { StyledLink } from './Home'
import Logo from '@/components/Logo'
import Input from '@/components/Input'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Button from '@/components/Button'
import CheckAccount from '@/components/CheckAccount'

function SignUp() {
  return (
    <SignUpWrapperDiv>
      <SrOnlyH2>회원가입</SrOnlyH2>
      <Link to="/">
        <Logo />
      </Link>

      <Button
        $bgcolor="#FFDC00"
        color="#1E1E1E"
        text="KaKao 로그인"
        width={'360px'}
      />
      <FormWrapper>
        <label htmlFor="email" aria-label="이메일"></label>
        <Input id="email" type="input" placeholder="이메일" width="345px" />
        <label htmlFor="userName" aria-label="사용자 이름"></label>
        <Input
          id="userName"
          type="input"
          placeholder="사용자 이름"
          width="345px"
        />
        <label htmlFor="nickName" aria-label="별명"></label>
        <Input
          id="nickName"
          type="input"
          placeholder="닉네임"
          maxlength={5}
          width="345px"
        />
        <label htmlFor="password" aria-label="비밀번호"></label>
        <Input
          id="password"
          type="password"
          placeholder="패스워드"
          width="345px"
        />
        <label htmlFor="checkPassword" aria-label="비밀번호 재확인"></label>
        <Input type="checkPassword" placeholder="패스워드 확인" width="345px" />
        <AllAgreeDiv>
          <label htmlFor="allAgree"></label>
          <CheckBox id="allAgree" type="checkbox" />
          전체 약관 동의
        </AllAgreeDiv>
        <AgreeDiv>
          <label htmlFor="useAgree"></label>
          <CheckBox id="useAgree" type="checkbox" />
          이용 약관 동의
        </AgreeDiv>
        <AgreeDiv>
          <label htmlFor="personalAgree"></label>
          <CheckBox id="personalAgree" type="checkbox" />
          개인정보 수집 및 이용 동의
        </AgreeDiv>
        <StyledLink to="/main">
          <Button type="submit" text="가입하기" width={'360px'} />
        </StyledLink>
      </FormWrapper>
      <StyledLink to="/login">
        <CheckAccount text1="이미 계정이 있으신가요?" text2="로그인" />
      </StyledLink>
    </SignUpWrapperDiv>
  )
}

export default SignUp

export const SignUpWrapperDiv = styled.div`
  width: 90%;
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 700px) {
    margin-bottom: 90px;
  }
`

export const SrOnlyH2 = styled.h2`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`
export const FormWrapper = styled.form`
  width: 90%;
  padding: 30px 0 20px 0;
  border-top: 1px solid #bcbcbc;
  border-bottom: 1px solid #bcbcbc;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`

const AgreeDiv = styled.div`
  width: 345px;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 10px;
  padding-right: 10px;
  color: #777777;
`

const AllAgreeDiv = styled(AgreeDiv)`
  height: 32px;
  background: #ebfaf8;
  border: 1px solid #bcbcbc;
  border-radius: 5px;
`

const CheckBox = styled.input`
  width: 15px;
  height: 15px;
`

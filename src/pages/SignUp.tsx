import { StyledLink } from './Home'
import Logo from '@/components/Logo'
import Input from '@/components/Input'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'
import Button from '@/components/Button'
import { useNavigate } from 'react-router-dom'
import CheckAccount from '@/components/CheckAccount'
import ErrorMessage from '@/components/ErrorMessage'
import { isEmailValid, isPasswordReg } from '@/utils/loginRegs'
import { enterUserData, insertUserData } from '@/utils/userData'

function SignUp() {
  const navigate = useNavigate()

  const emailRef = useRef<HTMLInputElement>(null)
  const usernameRef = useRef<HTMLInputElement>(null)
  const nicknameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)

  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [checkPasswordMatch, setCheckPasswordMatch] = useState<string | null>(
    null
  )

  // input에서 focus가 벗어나면 정규식검사를 진행합니다.
  const handleEmailBlur = () => {
    const emailValue = (emailRef.current?.value || '').trim()

    if (emailValue === '') {
      setEmailError('이메일을 입력해주세요.')
    } else if (!isEmailValid(emailValue)) {
      setEmailError('올바른 이메일 형식이 아닙니다.')
    } else {
      setEmailError(null)
    }
  }

  const handlePasswordBlur = () => {
    const passwordValue = passwordRef.current?.value || ''

    if (passwordValue === '') {
      setPasswordError('비밀번호를 설정해주세요.')
    } else if (!isPasswordReg(passwordValue)) {
      setPasswordError(
        '비밀번호는 알파벳 대/소문자, 숫자, 그리고 특수문자 중 하나 이상을 포함한 총 8자 이상의 길이여야 합니다.'
      )
    } else {
      setPasswordError(null)
    }
  }

  // 패스워드 중복 확인
  const handleConfirmPasswordChange = () => {
    const passwordValue = passwordRef.current?.value || ''
    const confirmPasswordValue = confirmPasswordRef.current?.value || ''

    if (passwordValue === confirmPasswordValue) {
      setCheckPasswordMatch(null)
    } else if (confirmPasswordValue === '') {
      setCheckPasswordMatch(null)
    } else {
      setCheckPasswordMatch('비밀번호가 일치하지 않습니다.')
    }
  }

  const handleEnterUserData = async (event: React.MouseEvent) => {
    event.preventDefault()

    const formData = {
      email: emailRef.current?.value || '',
      username: usernameRef.current?.value || '',
      nickname: nicknameRef.current?.value || '',
      password: passwordRef.current?.value || ''
    }

    // input의 입력값이 존재하지 않다면 실행을 종료합니다.
    if (Object.values(formData).some(value => value === '')) {
      console.error('입력값을 모두 채워주세요.')
      return
    }

    try {
      const uuid = await enterUserData(formData)
      if (uuid) {
        await insertUserData(formData, uuid)
        alert('회원가입이 완료되었습니다. 환영합니다! 🤗')
        navigate('/login')
      } else {
        console.error('UUID가 없습니다.')
      }
    } catch (error) {
      console.error(`Error: ${error}`)
    }
  }

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
        <Input
          id="email"
          type="input"
          placeholder="이메일"
          width="345px"
          name="email"
          inputRef={emailRef}
          onBlur={handleEmailBlur}
        />
        {emailError ? <ErrorMessage>{emailError}</ErrorMessage> : null}
        <label htmlFor="userName" aria-label="사용자 이름"></label>
        <Input
          id="userName"
          type="input"
          placeholder="사용자 이름"
          width="345px"
          name="username"
          inputRef={usernameRef}
        />
        <label htmlFor="nickName" aria-label="별명"></label>
        <Input
          id="nickName"
          type="input"
          placeholder="닉네임"
          maxlength={5}
          width="345px"
          name="nickname"
          inputRef={nicknameRef}
        />
        <label htmlFor="password" aria-label="비밀번호"></label>
        <Input
          id="password"
          type="password"
          placeholder="패스워드"
          width="345px"
          name="password"
          inputRef={passwordRef}
          onBlur={handlePasswordBlur}
        />
        {passwordError ? <ErrorMessage>{passwordError}</ErrorMessage> : null}
        <label htmlFor="checkPassword" aria-label="비밀번호 재확인"></label>
        <Input
          type="password"
          placeholder="패스워드 확인"
          width="345px"
          name="confirmPassword"
          inputRef={confirmPasswordRef}
          onBlur={handleConfirmPasswordChange}
        />
        {confirmPasswordRef ? (
          <ErrorMessage>{checkPasswordMatch}</ErrorMessage>
        ) : null}
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
          <Button
            type="submit"
            text="가입하기"
            width={'360px'}
            onClick={handleEnterUserData}
          />
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

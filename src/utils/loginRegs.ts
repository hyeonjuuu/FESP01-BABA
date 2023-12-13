// // 아이디 : 주소의 시작은 알파벳 대/소문자, 숫자, 그리고 일부 특수문자(_, ., %, +, -) 중 하나 이상으로 구성
export const isEmailValid = (email: string) => {
  const idCheck = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g

  return idCheck.test(String(email).toLowerCase())
}

// 비밀번호는 알파벳 대/소문자, 숫자, 그리고 특수문자 중 하나 이상을 포함한 총 8자 이상의 길이여야 합니다.
export const isPasswordReg = (pw: string) => {
  const pwCheck = /^(?=.*[!@#$%^&*()-_+=])[a-zA-Z0-9!@#$%^&*()-_+=]{8,}$/g
  return pwCheck.test(String(pw))
}

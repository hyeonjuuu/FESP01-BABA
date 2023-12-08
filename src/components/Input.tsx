import styled from 'styled-components'

interface InputProps {
  type: string
  placeholder?: string
  maxlength?: number
  id?: string
}

function Input({ type, placeholder, maxlength, id }: InputProps) {
  return (
    <>
      <StyledInput
        id={id}
        type={type}
        placeholder={placeholder}
        maxLength={maxlength}
      />
    </>
  )
}

export default Input

const StyledInput = styled.input`
  width: 100%;
  max-width: 300px;
  height: 32px;
  border: 1px solid #bcbcbc;
  border-radius: 5px;
  padding-left: 10px;
  margin-bottom: 10px;

  &::placeholder {
    color: #bcbcbc;
    font-family: 'GmarketSans';
  }
`

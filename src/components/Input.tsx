import styled from 'styled-components'

interface InputProps {
  type: string
  placeholder?: string
  maxlength?: number
  id?: string
  width: string
  $noBorder?: boolean // 새로운 prop 추가
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  name?: string
  inputRef?: React.Ref<HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
}

function Input({
  type,
  placeholder,
  maxlength,
  id,
  width = '100%',
  $noBorder = false,
  name,
  onChange,
  inputRef,
  onBlur
}: InputProps) {
  return (
    <>
      <StyledInput
        id={id}
        type={type}
        placeholder={placeholder}
        maxLength={maxlength}
        width={width}
        $noBorder={$noBorder}
        onChange={onChange}
        name={name}
        ref={inputRef}
        onBlur={onBlur}
      />
    </>
  )
}

export default Input

const StyledInput = styled.input<InputProps>`
  width: ${props => props.width || '100%'};
  height: 44px;
  border: ${props =>
    props.$noBorder ? 'none' : '1.5px solid #bcbcbc'}; // 조건부로 border 설정
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

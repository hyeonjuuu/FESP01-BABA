import React from 'react'
import styled from 'styled-components'

interface ErrorMessageProps {
  children: React.ReactNode
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ children }) => {
  return <ErrorMessageWrapper>{children}</ErrorMessageWrapper>
}

export default ErrorMessage

const ErrorMessageWrapper = styled.div`
  color: red;
  font-size: 12px;
  max-width: 360px;
  width: 100%;
`

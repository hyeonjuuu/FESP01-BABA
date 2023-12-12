import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`

body, #root {
  font-family: GmarketSans;
  color: #303032;
  margin: 0;
  padding: 0;
  margin-left : auto;
  margin-right: auto;
  background: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.color};
  border-color: ${({ theme }) => theme.borderColor};
}

button {
  background: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.color};
  border-color: ${({ theme }) => theme.borderColor};
  cursor: pointer;
  font-family: GmarketSans;
  
}

a {
  text-decoration: none;
  color: black;
}

label{
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
`

export default GlobalStyle

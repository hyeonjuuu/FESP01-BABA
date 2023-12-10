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

`

export default GlobalStyle

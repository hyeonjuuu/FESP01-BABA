import styled from 'styled-components'

const Footer = () => {
  return (
    <FooterContainer>
      <Button>소개</Button>
      <Button>도움말</Button>
      <Button>홍보 센터</Button>
      <Button>API</Button>
      <Button>채용 정보</Button>
      <Button>개인정보처리방침</Button>
      <Button>약관</Button>
      <Button>위치</Button>
      <Button>언어</Button>
      <MetaVerified>Meta Verified</MetaVerified>
      <Copyright>&copy; 2023 INSTAGRAM FROM META</Copyright>
    </FooterContainer>
  )
}

const FooterContainer = styled.footer`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 20px;
  background-color: #f0f0f0;
  text-align: center;
`

const Button = styled.button`
  background-color: #3897f0;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
`

const MetaVerified = styled.span`
  margin-top: 10px;
  font-size: 12px;
  color: #999;
`

const Copyright = styled.p`
  width: 100%;
  margin-top: 20px;
  font-size: 12px;
  color: #999;
`

export default Footer

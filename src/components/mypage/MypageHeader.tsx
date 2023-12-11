import styled from 'styled-components'
import addIcon from '@/assets/icon/Add.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faBars } from '@fortawesome/free-solid-svg-icons'

function MypageHeader() {
  return (
    <Box>
      <Wrapper>
        <UserName>h0_ri</UserName>
        <Btn>
          <FontAwesomeIcon icon={faChevronDown} />
        </Btn>
      </Wrapper>

      <Wrapper>
        <Btn>
          <Image src={addIcon} alt="피드 추가하기" />
        </Btn>

        <Btn>
          <FontAwesomeIcon icon={faBars} />
        </Btn>
      </Wrapper>
    </Box>
  )
}

export default MypageHeader

const Box = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  margin-bottom: 8px;
  @media (min-width: 391px) {
    display: none;
  }
`

const Wrapper = styled.div`
  display: flex;
`

const UserName = styled.h5`
  font-weight: 700;
  font-size: x-large;
  margin: 0;
`

const Btn = styled.button`
  border: none;
  background-color: white;
`

const Image = styled.img`
  width: 20px;
`

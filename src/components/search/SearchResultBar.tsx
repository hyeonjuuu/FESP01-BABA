import styled from 'styled-components'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ResultBarContain = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  /* border: 1px solid black; */
  width: 100%;
`

const Image = styled.span`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: tomato;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px;
  margin-left: 0;
`

const ResultBar = styled.span`
  font-weight: 600;
`

const ResultBarInfo = styled.span`
  font-size: 13px;
  font-weight: 300;
`

const ClearBtn = styled.button`
  background-color: white;
  border-style: none;
`

const Contain = styled.div`
  display: flex;
  align-items: center;
`

const Warppaer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`

function SearchResultBar() {
  return (
    <ResultBarContain>
      <Contain>
        <Image>사진</Image>
        <Warppaer>
          <ResultBar>#고양이</ResultBar>
          <ResultBarInfo>게시물 100개 미만개</ResultBarInfo>
        </Warppaer>
      </Contain>

      <ClearBtn>
        <FontAwesomeIcon icon={faX} />
      </ClearBtn>
    </ResultBarContain>
  )
}

export default SearchResultBar

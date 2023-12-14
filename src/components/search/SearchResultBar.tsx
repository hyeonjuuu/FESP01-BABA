import styled from 'styled-components'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useThemeStore from '@/store/useThemeStore'

interface ResultBarContainProps {
  $darkMode: boolean
}

function SearchResultBar() {
  const { $darkMode } = useThemeStore()

  return (
    <ResultBarContain $darkMode={$darkMode}>
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

const ClearBtn = styled.button`
  border-style: none;
`

export const ResultBarContain = styled.div<ResultBarContainProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 10px;
  border-radius: 8px;

  &:hover {
    background: ${({ $darkMode }) => ($darkMode ? '#28C7C7' : '#fffc9f')};

    ${ClearBtn} {
      background: ${({ $darkMode }) => ($darkMode ? '#28C7C7' : '#fffc9f')};
    }
  }
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

export const ResultBar = styled.span`
  font-weight: 600;
`

export const ResultBarInfo = styled.span`
  font-size: 13px;
  font-weight: 300;
`

export const Contain = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

export const Warppaer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`

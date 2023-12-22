import styled from 'styled-components'
import { ResultBarContainProps } from '@/types'
import useThemeStore from '@/store/useThemeStore'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface SearchResultBarProps {
  title: string
  onClick?: (item: string) => void
  inputRef: React.RefObject<HTMLInputElement>
  onSearch: () => void
}

function SearchResultBar({
  title,
  onClick,
  inputRef,
  onSearch
}: SearchResultBarProps) {
  const { $darkMode } = useThemeStore()

  const handleSearchInput = () => {
    // 검색어를 부모 컴포넌트로 전달
    // onClick?.(title)
    if (inputRef.current) {
      inputRef.current.value = title
      onSearch()
    }
  }

  return (
    <ResultBarContain $darkMode={$darkMode}>
      <Contain onClick={handleSearchInput}>
        <Warppaer>
          <ResultBar># {title}</ResultBar>
        </Warppaer>
      </Contain>
      <ClearBtn type="button" onClick={() => onClick?.(title)}>
        <FontAwesomeIcon icon={faX} />
      </ClearBtn>
    </ResultBarContain>
  )
}

export default SearchResultBar

const ClearBtn = styled.button`
  border-style: none;
  width: 10%;
  height: 100%;
  font-size: 14px;
`

export const ResultBarContain = styled.div<ResultBarContainProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 540px;
  padding: 16px 6px;
  border-radius: 8px;

  &:hover {
    background: ${({ $darkMode }) => ($darkMode ? '#28C7C7' : '#fffc9f')};

    ${ClearBtn} {
      background: ${({ $darkMode }) => ($darkMode ? '#28C7C7' : '#fffc9f')};
    }
  }
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

import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ResultBarContainProps } from '@/types'
import useThemeStore from '@/store/useThemeStore'
import getSearchMovies from '@/api/getSearchMovies'
import { useEffect, useRef, useState } from 'react'
import loadingSpinner from '@/assets/spinner/popcornLoding.gif'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import SearchResultBar, {
  Contain,
  ResultBar,
  Warppaer
} from '@/components/search/SearchResultBar'
import GoingUpBtn from '@/components/GoingUpBtn'

function SearchPage() {
  const { $darkMode } = useThemeStore()
  const inputRef = useRef<HTMLInputElement | null>(null)

  const [isSearched, setIsSearched] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSearchBtnDisabled, setIsSearchBtnDisabled] = useState(true)
  const [showSearchResult, setShowSearchResult] = useState<boolean>(false)
  const [searchDataList, setSearchDataList] = useState<SearchListProps[]>([])
  const [oldSearchRecordList, setOldSearchRecordList] = useState<string[]>([])

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase()
    setIsSearchBtnDisabled(value.length === 0)
    if (!value) {
      setIsSearched(false)
      setShowSearchResult(false)
    }
  }

  const handleSearchBtn = async (
    e?: React.MouseEvent | React.KeyboardEvent
  ) => {
    if (e) {
      e.preventDefault()
    }
    const inputValue = inputRef.current?.value || ''

    const earlyStorageItems = JSON.parse(
      localStorage.getItem('oldSearchRecordList') || '[]'
    ) as string[]

    // 중복된 값을 제거하고 최신 검색값을 업데이트합니다.
    const updatedList = [
      inputValue,
      ...earlyStorageItems.filter(item => item !== inputValue)
    ]
    localStorage.setItem('oldSearchRecordList', JSON.stringify(updatedList))
    setOldSearchRecordList(updatedList)

    try {
      setIsLoading(true)
      const searchData = await getSearchMovies(inputValue || '')

      const searchResults = searchData.results.map(
        (result: SearchResultProps) => ({
          id: result.id,
          media_type: result.media_type,
          title: result.title,
          name: result.name,
          poster_path: result.poster_path
        })
      )
      setSearchDataList(searchResults)
      setShowSearchResult(true)
      setIsSearched(true)
    } catch (error) {
      console.error(error)
    } finally {
      inputRef.current!.value = ''
      setIsSearchBtnDisabled(true)
      setIsLoading(false)
    }
  }

  const handleSearchCancle = () => {
    window.location.reload()
  }

  // 새로고침시 최근 검색목록을 스토리지에서 가져옵니다.
  useEffect(() => {
    const earlyStorageItems = JSON.parse(
      localStorage.getItem('oldSearchRecordList') || '[]'
    ) as string[]
    setOldSearchRecordList(earlyStorageItems)
  }, [])

  // 최근 검색어 모두 삭제
  const handleAllRemove = () => {
    setOldSearchRecordList(() => {
      const updatedList: string[] = []
      localStorage.setItem('oldSearchRecordList', JSON.stringify(updatedList))
      return updatedList
    })
  }

  // 삭제버튼 클릭시 최근검색어가 제거됩니다.
  const handleRemoveStorageItem = (item: string) => {
    const updatedList = oldSearchRecordList.filter(list => list !== item)
    localStorage.setItem('oldSearchRecordList', JSON.stringify(updatedList))
    setOldSearchRecordList(updatedList)
  }

  return (
    <Box>
      <h3 hidden>검색창</h3>
      <SearchBarWrapper>
        <SearchBar>
          <Icon>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Icon>
          <Input
            type="text"
            placeholder="Search"
            onChange={handleSearchInput}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleSearchBtn(e)
              }
            }}
            ref={inputRef}
          />
        </SearchBar>

        {showSearchResult || searchDataList.length > 0 ? (
          <ClearBtn type="button" onClick={handleSearchCancle}>
            취소
          </ClearBtn>
        ) : (
          <ClearBtn
            type="button"
            onClick={handleSearchBtn}
            disabled={isSearchBtnDisabled}
          >
            검색
          </ClearBtn>
        )}
      </SearchBarWrapper>
      <Wrapper>
        <RecentSearch>
          {showSearchResult ? '검색 결과' : '최근 검색'}
        </RecentSearch>
        {showSearchResult ? (
          ''
        ) : (
          <SeeAllBtn onClick={handleAllRemove}>모두 삭제</SeeAllBtn>
        )}
      </Wrapper>
      <ResultWrapper>
        {isLoading ? (
          <LodingWrapper>
            <LoadingSpinner src={loadingSpinner} alt="로딩 중" />
          </LodingWrapper>
        ) : isSearched ? (
          searchDataList.length > 0 ? (
            // Case 1: searchResults에 값이 있는 경우
            searchDataList.map(result => (
              <StyledLink key={result.id} to={`/detail/${result.id}`}>
                <Container $darkMode={$darkMode}>
                  <Contain>
                    <Image
                      src={`https://image.tmdb.org/t/p/original${result.poster_path}`}
                      alt={
                        result.media_type === 'movie'
                          ? result.title
                          : result.name
                      }
                    />
                    <Warppaer>
                      <ResultBar>
                        {result.media_type === 'movie' ? '영화' : 'TV'} -{' '}
                        {result.media_type === 'movie'
                          ? result.title
                          : result.name}
                      </ResultBar>
                    </Warppaer>
                  </Contain>
                </Container>
              </StyledLink>
            ))
          ) : (
            // Case 2: searchResults가 빈 배열인 경우
            <NoResultsMessage>검색 결과가 없습니다.</NoResultsMessage>
          )
        ) : oldSearchRecordList?.length > 0 ? (
          // Case 3: OldSearchRecordList 값이 있는 경우
          oldSearchRecordList?.map(item => (
            <SearchResultBar
              key={item}
              title={item}
              onClick={handleRemoveStorageItem}
              inputRef={inputRef}
              onSearch={handleSearchBtn}
            />
          ))
        ) : (
          // Case 4: OldSearchRecordList 값이 없는 경우
          <NoResultsMessage>최근 검색어가 없습니다.</NoResultsMessage>
        )}
      </ResultWrapper>
      <GoingUpBtn />
    </Box>
  )
}

export default SearchPage

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10px;
  margin-top: 30px;
`

export const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: 490px;
  margin-bottom: 20px;

  @media (min-width: 701px) {
    flex-direction: row;
    justify-content: center;
    width: 100%;
  }
`

export const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  padding: 10px;
  background-color: #e8e8e8;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;

  @media (min-width: 701px) {
    width: 98%;
    max-width: none;
  }
`

export const Icon = styled.span`
  width: 12px;
  height: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #c0c0c0;
`

export const Input = styled.input`
  background-color: #e8e8e8;
  border: none;
  outline: none;
  height: 100%;
  width: 370px;
  padding-left: 15px;

  &::placeholder {
    color: #c0c0c0;
    font-size: 14px;
    font-weight: 500;
  }

  @media (min-width: 701px) {
    width: 600px;
  }
`

export const ClearBtn = styled.button`
  margin-left: 10px;
  font-size: 14px;
  padding: 0;
  width: 10%;
  min-width: 30px;
  border: none;
`

const Wrapper = styled.div`
  border-top: 2px solid rgba(0, 0, 0, 0.1);
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
  max-width: 540px;
`

export const RecentSearch = styled.h4`
  margin: 0;
`

const SeeAllBtn = styled.button`
  margin-left: 10px;
  font-size: 14px;
  padding: 0;
  width: 70px;
  border: none;
  color: #0282d1;
`

const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  @media (min-width: 701px) {
    width: 800px;
    max-width: none;
  }
`

const LodingWrapper = styled.div`
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`

export const LoadingSpinner = styled.img`
  height: 200px;
  width: 250px;
  @media (min-width: 701px) {
    height: 400px;
    width: 500px;
  }
`

const StyledLink = styled(Link)`
  width: 100%;
  @media (min-width: 701px) {
    display: flex;
    justify-content: center;
    max-width: 890px;
  }
`

export const Image = styled.img`
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

const Container = styled.div<ResultBarContainProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 67%;
  padding: 0 6px;
  border-radius: 8px;

  &:hover {
    background: ${({ $darkMode }) => ($darkMode ? '#28C7C7' : '#fffc9f')};

    ${ClearBtn} {
      background: ${({ $darkMode }) => ($darkMode ? '#28C7C7' : '#fffc9f')};
    }
  }
`

const NoResultsMessage = styled.div`
  height: 100px;
  line-height: 100px;
`

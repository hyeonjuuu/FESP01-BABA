import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SearchResultBar, {
  Contain,
  ResultBar,
  ResultBarContain,
  ResultBarInfo,
  Warppaer
} from '@/components/search/SearchResultBar'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useCallback, useEffect, useRef, useState } from 'react'
import getSearchMovies from '@/api/getSearchMovies'
import debounce from '@/utils/debounce'

interface SearchListProps {
  id: number
  title: string
  poster_path: string | null
}

interface SearchResultProps {
  id: number
  title: string
  poster_path: string | null
}

function SearchPage() {
  const inputRef = useRef<string | null>(null)

  const [searchInput, setSearchInput] = useState<string>('')
  const [searchList, setSearchList] = useState<SearchListProps[]>([])
  const [isState, setIsState] = useState<boolean>(false)
  const [isSearchBtnDisabled, setIsSearchBtnDisabled] = useState(true)

  const handleSearchInput = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // setSearchInput(e.target.value.toLowerCase())
      e.target.value = e.target.value.toLowerCase()
      setIsSearchBtnDisabled(e.target.value.length === 0) // input value가 변경될 때마다 검색 버튼의 활성화 상태 갱신
    },
    500
  )

  // useEffect(() => {
  //   if (isState) {
  //     // setSearchInput('')
  //     setIsState(false)
  //   }
  // }, [isState])

  console.log('searchInput: ', searchInput)

  const handleSearchBtn = async (e: React.MouseEvent) => {
    e.preventDefault()

    try {
      // const searchData = await getSearchMovies(searchInput)
      const searchData = await getSearchMovies(inputRef?.current?.value)

      const searchResults = searchData.results.map(
        (result: SearchResultProps) => ({
          id: result.id,
          title: result.title,
          poster_path: result.poster_path
        })
      )
      setSearchList(searchResults)
    } catch (error) {
      console.error(error)
    } finally {
      // setIsState(true)
      // setSearchInput('')
      inputRef.current.value = ''
      setIsSearchBtnDisabled(true) // 검색 후에는 검색 버튼을 다시 비활성화
    }
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
            ref={inputRef}
          />
        </SearchBar>
        <ClearBtn
          // type="reset"
          onClick={handleSearchBtn}
          disabled={isSearchBtnDisabled}

          // disabled={inputRef.current && inputRef.current.value.length === 0}
        >
          검색
        </ClearBtn>
      </SearchBarWrapper>
      <HorizontalLine />
      <Wrapper>
        <RecentSearch>검색 결과</RecentSearch>
      </Wrapper>
      <ResultWrapper>
        {searchList.map(result => (
          <StyledLink key={result.id} to={`/detail/${result.id}`}>
            <ResultBarContain>
              <Contain>
                <Image
                  src={`https://image.tmdb.org/t/p/original${result.poster_path}`}
                  alt={`${result.title} 이미지`}
                />
                <Warppaer>
                  <ResultBar>{result.title}</ResultBar>
                  <ResultBarInfo>{`게시물 100개 미만개`}</ResultBarInfo>
                </Warppaer>
              </Contain>
            </ResultBarContain>
          </StyledLink>
        ))}
      </ResultWrapper>
      <Wrapper>
        <RecentSearch>최근 검색</RecentSearch>
        <SeeAllBtn>모두 보기</SeeAllBtn>
      </Wrapper>
      <ResultWrapper>
        <StyledLink to="/detail">
          <SearchResultBar />
        </StyledLink>
        <StyledLink to="/detail">
          <SearchResultBar />
        </StyledLink>
        <StyledLink to="/detail">
          <SearchResultBar />
        </StyledLink>
        <StyledLink to="/detail">
          <SearchResultBar />
        </StyledLink>
      </ResultWrapper>
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

const SearchBarWrapper = styled.div`
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  max-width: 500px;

  @media (min-width: 701px) {
    flex-direction: row;
    justify-content: center;
    width: 100%;
  }
`

const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  padding: 10px;
  background-color: #e8e8e8;
  border-radius: 8px;
  max-width: 500px;
  width: 80%;
  @media (min-width: 701px) {
    width: 98%;
    max-width: none;
  }
`

const Icon = styled.span`
  width: 12px;
  height: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #c0c0c0;
`

const Input = styled.input`
  background-color: #e8e8e8;
  border: none;
  outline: none;
  height: 100%;
  width: 370px;

  &::placeholder {
    color: #c0c0c0;
    font-size: 14px;
    font-weight: 500;
  }

  @media (min-width: 701px) {
    width: 600px;
  }
`

const ClearBtn = styled.button`
  margin-left: 10px;
  font-size: 14px;
  padding: 0;
  width: 10%;
  min-width: 30px;
  border: none;
`

const HorizontalLine = styled.div`
  height: 1px;
  background-color: #ccc;
  margin-top: 10px;
  margin-bottom: 15px;

  @media (max-width: 700px) {
    width: 100%;
  }
  @media (min-width: 701px) {
    width: 69%;
  }
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
  max-width: 550px;
`

const RecentSearch = styled.h4`
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

const StyledLink = styled(Link)`
  width: 100%;
  @media (min-width: 701px) {
    width: 70%;
  }
`

const Image = styled.img`
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

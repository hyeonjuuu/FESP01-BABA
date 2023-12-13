import getSearchMovies from '@/api/getSearchMovies'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {
  Contain,
  ResultBar,
  ResultBarContain,
  ResultBarInfo,
  Warppaer
} from './SearchResultBar'

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

interface SearchInputBarProps {
  isWriting: boolean
}

const SearchInputBar: React.FC<SearchInputBarProps> = ({ isWriting }) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [searchList, setSearchList] = useState<SearchListProps[]>([])
  const [isSearchBtnDisabled, setIsSearchBtnDisabled] = useState(true)

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.toLowerCase()
    setIsSearchBtnDisabled(e.target.value.length === 0) // input value가 변경될 때마다 검색 버튼의 활성화 상태 갱신
  }

  const handleSearchBtn = async (e: React.MouseEvent) => {
    e.preventDefault()

    try {
      const searchData = await getSearchMovies(inputRef.current?.value || '')

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
      inputRef.current!.value = ''
      setIsSearchBtnDisabled(true) // 검색 후에는 검색 버튼을 다시 비활성화
    }
  }

  const handleSelect = () => {}

  const renderContent = (result: SearchResultProps, isWriting: boolean) => {
    if (isWriting) {
      return (
        <Wrapper key={result.id}>
          <ResultBarContain>
            <Contain onClick={handleSelect}>
              <Image
                src={`https://image.tmdb.org/t/p/original${result.poster_path}`}
                alt={`${result.title} 이미지`}
              />
              <Wrapper>
                <ResultBar>{result.title}</ResultBar>
              </Wrapper>
            </Contain>
          </ResultBarContain>
        </Wrapper>
      )
    } else {
      return (
        <StyledLink key={result.id} to={`/detail/${result.id}`}>
          <ResultBarContain>
            <Contain>
              <Image
                src={`https://image.tmdb.org/t/p/original${result.poster_path}`}
                alt={`${result.title} 이미지`}
              />
              <Wrapper>
                <ResultBar>{result.title}</ResultBar>
                <ResultBarInfo>{`게시물 100개 미만개`}</ResultBarInfo>
              </Wrapper>
            </Contain>
          </ResultBarContain>
        </StyledLink>
      )
    }
  }

  return (
    <>
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
        <ClearBtn onClick={handleSearchBtn} disabled={isSearchBtnDisabled}>
          검색
        </ClearBtn>
      </SearchBarWrapper>
      <HorizontalLine />
      <Wrapper>
        <RecentSearch>검색 결과</RecentSearch>
      </Wrapper>
      <ResultWrapper>
        {searchList.map(result => renderContent(result, isWriting))}
      </ResultWrapper>
    </>
  )
}

export default SearchInputBar

export const SearchBarWrapper = styled.div`
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

export const SearchBar = styled.div`
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

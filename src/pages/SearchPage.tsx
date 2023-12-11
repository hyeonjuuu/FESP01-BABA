import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SearchResultBar from '@/components/search/SearchResultBar'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function SearchPage() {
  return (
    <Box>
      <h3 hidden>검색창</h3>
      <SearchBarWrapper>
        <SearchBar>
          <Icon>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Icon>
          <Input type="text" placeholder="Search" />
        </SearchBar>
        <ClearBtn>취소</ClearBtn>
      </SearchBarWrapper>
      <HorizontalLine />
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
`

const SearchBarWrapper = styled.div`
  display: flex;
`

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 20px;
  padding: 10px;
  background-color: #e8e8e8;
  border-radius: 8px;
  max-width: 390px;
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
  width: 280px;
  &::placeholder {
    color: #c0c0c0;
    font-size: 14px;
    font-weight: 500;
  }
`

const ClearBtn = styled.button`
  background-color: white;
  margin-left: 10px;
  font-size: 14px;
  padding: 0;
  width: 30px;
  border: none;
`

const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin-top: 10px;
  margin-bottom: 15px;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
  max-width: 390px;
`

const RecentSearch = styled.h4`
  margin: 0;
`

const SeeAllBtn = styled.button`
  background-color: white;
  margin-left: 10px;
  font-size: 14px;
  padding: 0;
  width: 55px;
  border: none;
  color: #0282d1;
`

const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const StyledLink = styled(Link)`
  width: 100%;
`

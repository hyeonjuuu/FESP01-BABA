import styled from 'styled-components'

function Search() {
  return (
    <SearchForm>
      <SearchFieldSet>
        {/* <SearchLegend>Login</SearchLegend> */}

        <SearchDiv>
          <SearchInput
            type="text"
            placeholder="검색어를 입력하세요 :)"
            required
          />
        </SearchDiv>

        {/* <SubmitButton type="submit">
          <i></i>
        </SubmitButton> */}
      </SearchFieldSet>
    </SearchForm>
  )
}

export default Search

/* -------------------------------------------------------------------------- */
const SearchForm = styled.div`
  position: relative;
  flex-grow: 1;
  border-radius: 8px;
  padding: 0;
  width: 90%;
  display: flex;
  justify-content: center;
`
const SearchFieldSet = styled.fieldset`
  width: 90%;
  border: none;
  padding: 0;
`

const SearchDiv = styled.div`
  position: relative;
  width: 100%;
`

const SearchInput = styled.input`
  background: #cdcdcd;
  width: 100%;
  display: block;
  border-radius: 8px;
  transition: 0.2s ease-out;
  color: darken(#8e8e8e, 30%);
  border: 1px solid #ededed;
  height: 48px;
  font-size: 14px;
  padding: 0 16px;
  &:focus {
    outline: 0;
    transition: 0.2s ease-out;
    background: #3e3e3e;
    border-color: #cacaca;
    color: #aaeec4;
  }
`

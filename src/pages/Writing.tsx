import styled from 'styled-components'
import Button from '@/components/Button'
import { useRef, useState } from 'react'
import ottIcons from '@/utils/ottIconImage'
import { addReview } from '@/api/reviewApi'
import { useNavigate } from 'react-router-dom'
import StarRating from '@/components/StarRating'
import { ottIconNames } from '@/utils/ottIconImage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { ClearBtn, Icon, Image, Input } from './SearchPage'
import getSearchMovies from '@/api/getSearchMovies'
import { ResultBar, Warppaer } from '@/components/search/SearchResultBar'

function Writing() {
  const naviagte = useNavigate()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [searchList, setSearchList] = useState<SearchListProps[]>([])
  const [isSearchBtnDisabled, setIsSearchBtnDisabled] = useState(true)
  const [selectMovie, setSelectMovie] = useState<SearchResultProps | null>(null)
  const [selectedOtt, setSelectedOtt] = useState<string[]>([])
  const [rating, setRating] = useState(0)
  const [text, setText] = useState('')

  //# 검색
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

  //# 기본 이미지 선택
  const handleSelect = (selectedResult: SearchListProps) => {
    setSelectMovie(selectedResult)
    setSearchList([])
  }

  //# OTT 선택
  const handleCheck = (iconName: string) => {
    setSelectedOtt(prevSelectedOtt => {
      if (prevSelectedOtt.includes(iconName)) {
        // If the OTT is already selected, do nothing
        return prevSelectedOtt
      } else {
        // Select the new OTT
        return [iconName]
      }
    })
  }

  //# 별점
  const handleRatingChange = (newRating: number) => {
    setRating(newRating)
  }

  const handleFocus = () => {
    if (text === 'Enter your text here...') {
      setText('')
    }
  }

  const handleBlur = () => {
    if (text === '') {
      setText('Enter your text here...')
    }
  }

  //# 내용 작성
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  //# 리뷰 등록
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const ottValue = selectedOtt

    const textValue = text === 'Enter your text here...' ? '' : text

    if (ottValue.length === 0 || textValue === '') {
      alert('ott를 선택, 내용을 작성해주세요')
      return
    }

    // formData : 주로 파일이나 이미지 같은 바이너리 데이터를 서버로 전송할 때 사용
    // const formData = new FormData()
    // if (selectedOtt.length > 0) {
    //   formData.append('ott', selectedOtt[0])
    // }
    // formData.append('text', textValue || '')

    try {
      await addReview(
        'movie_id',
        '0ebab27d-5be1-4d43-9e85-fa8a163b0db4', //user_id
        text,
        selectedOtt,
        rating
      )
      alert('리뷰가 등록되었습니다!')
      naviagte('/main')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Container>
      {/* <FormStyle encType="multipart/form-data"> */}
      <FormStyle>
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

        <ResultWrapper>
          {searchList.map(result => (
            <ResultBarContain
              key={result.id}
              onClick={() => handleSelect(result)}
            >
              <Contain>
                <Image
                  src={`https://image.tmdb.org/t/p/original${result.poster_path}`}
                  alt={`${result.title} 이미지`}
                />
                <Warppaer>
                  <ResultBar>{result.title}</ResultBar>
                </Warppaer>
              </Contain>
            </ResultBarContain>
          ))}
        </ResultWrapper>

        <Wrapper>
          {ottIcons.map((icon, index) => (
            <OttWrapper key={index}>
              <label htmlFor="ott">ott</label>
              <input
                type="checkbox"
                name="ott"
                id="ott"
                checked={selectedOtt.includes(ottIconNames[index])}
                onChange={() => handleCheck(ottIconNames[index])}
              />
              <IconBox>
                <OttIcon src={icon} alt={ottIconNames[index]} />
              </IconBox>
            </OttWrapper>
          ))}
        </Wrapper>

        <BtnWrapper>
          <ImgSelectBtn color="#3797EF" $hasBorder>
            기본 이미지
          </ImgSelectBtn>
          <ImgSelectBtn>사용자 이미지</ImgSelectBtn>
        </BtnWrapper>
        <OriginalImage>
          {/* <label htmlFor="photo">사진</label>
          <input
            ref={photoRef}
            type="file"
            accept="image/*"
            name="photo"
            id="photo"
            // multiple
            // onChange={handleUpload}
          ></input> */}
          {/* {movieImage && (
            <MoviePoster
              src={`https://image.tmdb.org/t/p/original${movieImage}`}
              alt="Movie Poster"
            />
          )} */}
          {selectMovie && (
            <MoviePoster
              src={`https://image.tmdb.org/t/p/original/${selectMovie.poster_path}`}
              alt={`${selectMovie.title} 포스터`}
            />
          )}
        </OriginalImage>

        <StarContainer>
          평점을 선택해주세요 <StarRating onRatingChange={handleRatingChange} />
        </StarContainer>

        <FeedText
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="이 컨텐츠에 대한 생각을 자유롭게 공유해보세요!🎬✨"
          onChange={handleInputChange}
        ></FeedText>

        <Button
          $bgcolor={'#3797EF'}
          text={'작성하기'}
          type={'submit'}
          color={'white'}
          width={'390px'}
          onClick={handleSubmit}
        />
      </FormStyle>
    </Container>
  )
}

export default Writing

const Container = styled.section`
  /* display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px; */
`

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  gap: 5px;
`

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: 390px;
  @media (min-width: 701px) {
    width: 100%;
  }
`

const ResultBarContain = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
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
`

const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  @media (min-width: 701px) {
    max-width: 400px;
  }
`

const Contain = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  max-width: 390px;
  overflow-x: scroll;
`

const OttWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 8px;
`

const IconBox = styled.div`
  width: 28px;
  height: 28px;
`

const OttIcon = styled.img`
  width: 100%;
  height: 100%;
`

const BtnWrapper = styled.div`
  display: flex;
`

const ImgSelectBtn = styled.button<{ $hasBorder?: boolean; color?: string }>`
  width: 195px;
  height: 44px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: ${props => props.color || 'white'};
  ${props =>
    props.$hasBorder &&
    `
      border: 1px solid black;
    `}
`

const OriginalImage = styled.div`
  width: 390px;
  height: 500px;
  background-color: #d9d9d9;
  position: relative;
`

const MoviePoster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const StarContainer = styled.div`
  width: 370px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
`

const FeedText = styled.textarea`
  width: 390px;
  height: 200px;
  border: none;
  box-sizing: border-box;
  border-radius: 5px;
  font-size: 16px;
  resize: none;
  padding: 10px;
`

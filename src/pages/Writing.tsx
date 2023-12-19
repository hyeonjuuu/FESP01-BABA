import { motion } from 'framer-motion'
import styled from 'styled-components'
import debounce from '@/utils/debounce'
import Button from '@/components/Button'
import ottIcons from '@/utils/ottIconImage'
import { useNavigate } from 'react-router-dom'
import userInfoInLs from '@/utils/userInfoInLs'
import StarRating from '@/components/StarRating'
import useThemeStore from '@/store/useThemeStore'
import { ottIconNames } from '@/utils/ottIconImage'
import { useEffect, useRef, useState } from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import getSearchMovies from '@/api/getSearchMovies'
import { ClearBtn, Icon, Image, Input } from './SearchPage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { ResultBar, Warppaer } from '@/components/search/SearchResultBar'
import { addReview, addReviewWithImgUrl, uploadImage } from '@/api/reviewApi'

interface ResultBarContainProps {
  $darkMode: boolean
}

function Writing() {
  const { $darkMode } = useThemeStore()
  const naviagte = useNavigate()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [searchList, setSearchList] = useState<SearchListProps[]>([])
  const [isSearchBtnDisabled, setIsSearchBtnDisabled] = useState(true)
  const [isSearched, setIsSearched] = useState(false) // 검색이 수행되었는지 나타내는 상태
  const [selectMovie, setSelectMovie] = useState<SearchResultProps | null>(null)
  const [isSelectImg, setIsSelectImg] = useState<boolean>(true)
  const [imgSrc, setImgSrc]: any = useState(null)
  const [image, setImage] = useState<File | null>(null)
  const [selectedOtt, setSelectedOtt] = useState<string[]>([])
  const [rating, setRating] = useState(0)
  const [text, setText] = useState('')

  //# 로그인 여부 확인
  const navigate = useNavigate()
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)

  useEffect(() => {
    if (!isAuthenticated) {
      const confirmed = window.confirm(
        '로그인 후 사용 할 수 있습니다. 로그인 페이지로 이동하시겠습니까?'
      )
      if (confirmed) {
        navigate('/login')
      } else {
        window.history.back()
      }
    }
  }, [isAuthenticated])

  useEffect(() => {
    const userIdInLs = userInfoInLs()
    setUserEmail(userIdInLs.userId) // local storage의 id = user Table의 email
  }, [])

  //# 검색
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.toLowerCase()
    setIsSearchBtnDisabled(e.target.value.length === 0) // input value가 변경될 때마다 검색 버튼의 활성화 상태 갱신
  }

  const handleSearchBtn = async (e: React.MouseEvent) => {
    e.preventDefault()
    setIsSearched(true) // 검색 버튼을 클릭하면 검색이 수행되었다고 상태를 갱신

    try {
      const searchData = await getSearchMovies(inputRef.current?.value || '')
      const searchResults = searchData.results.map(
        (result: SearchResultProps) => ({
          id: result.id,
          media_type: result.media_type,
          title: result.title,
          name: result.name,
          poster_path: result.poster_path
        })
      )
      setSearchList(searchResults)
    } catch (error) {
      console.error(error)
    } finally {
      inputRef.current!.value = ''
      // setIsSearched(false)
      setIsSearchBtnDisabled(true) // 검색 후에는 검색 버튼을 다시 비활성화
    }
  }

  // 기본 이미지 삽입
  const handleSelectMovie = (selectedResult: SearchListProps) => {
    setSelectMovie(selectedResult)
    setSearchList([])
    setIsSearched(false) // 영화를 선택하면 검색이 완료된 상태를 false로 설정
  }

  //# 이미지 선택
  const handleSelectImg = (e: React.MouseEvent) => {
    e.preventDefault()
  }

  const handleSelectDefaultImg = () => {
    setIsSelectImg(true)
  }

  const handleSelectUserImg = () => {
    setIsSelectImg(false)
  }

  // 이미지 미리보기
  const handleUpload = (e: any) => {
    const file = e.target.files[0]

    setImage(file) // api로 보내려고...
    const reader = new FileReader()
    reader.readAsDataURL(file)

    return new Promise<void>(resolve => {
      reader.onload = () => {
        setImgSrc(reader.result || null)
        resolve()
      }
    })
  }

  //# OTT 선택
  const handleCheck = (iconName: string) => {
    setSelectedOtt(prevSelectedOtt => {
      if (prevSelectedOtt.includes(iconName)) {
        return prevSelectedOtt.filter(ott => ott !== iconName)
      } else {
        return [iconName]
      }
    })
  }

  const handleInputOtt = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputOtt = event.target.value

    setSelectedOtt(prevSelectedOtt => {
      if (prevSelectedOtt.length === 0) {
        return [inputOtt]
      } else {
        const newSelectedOtt = [...prevSelectedOtt]
        newSelectedOtt[newSelectedOtt.length - 1] = inputOtt
        return newSelectedOtt
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
  const handleInputChange = debounce(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value)
    },
    500
  )

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '100px'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [text])

  //# 리뷰 등록
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const ottValue = selectedOtt
    const textValue = text === 'Enter your text here...' ? '' : text

    if (
      !selectMovie ||
      ottValue.length === 0 ||
      rating === 0 ||
      textValue === ''
    ) {
      alert('제목, ott, 평점, 내용을 작성해주세요')
      return
    }

    try {
      if (selectMovie && !imgSrc) {
        await addReview(
          selectMovie.id,
          userEmail!,
          text,
          selectedOtt,
          rating,
          selectMovie.title || selectMovie.name || 'Unknown Title'
        )
      } else if (selectMovie && imgSrc) {
        const imgUrl = await uploadImage(image!)
        await addReviewWithImgUrl(
          selectMovie.id,
          userEmail!,
          text,
          selectedOtt,
          rating,
          selectMovie.title || selectMovie.name || 'Unknown Title',
          imgUrl!
        )
      }
      alert('리뷰가 등록되었습니다!😊')
      naviagte('/main')
    } catch (error) {
      console.error(error)
      alert('리뷰 등록에 실패했습니다..😭')
    }
  }

  return (
    <section>
      <FormStyle encType="multipart/form-data">
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
          {isSearched && searchList.length === 0 ? (
            <NoResultsMessage>검색 결과가 없습니다.</NoResultsMessage>
          ) : (
            searchList.map(result => (
              <ResultBarContain
                key={result.id}
                onClick={() => handleSelectMovie(result)}
                $darkMode={$darkMode}
              >
                <Contain>
                  <Image
                    src={`https://image.tmdb.org/t/p/original${result.poster_path}`}
                    alt={`${result.title} 이미지`}
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
              </ResultBarContain>
            ))
          )}
        </ResultWrapper>

        <Wrapper>
          {ottIcons.map((icon, index) => (
            <OttWrapper key={index}>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <IconBox>
                  <OttIcon
                    src={icon}
                    alt={ottIconNames[index]}
                    title={ottIconNames[index]}
                  />
                  <OttLabel htmlFor={`ott${index}`}> ott</OttLabel>
                  <OttInput
                    type="checkbox"
                    name={`ott${index}`}
                    id={`ott${index}`}
                    checked={selectedOtt.includes(ottIconNames[index])}
                    onChange={() => handleCheck(ottIconNames[index])}
                  />
                </IconBox>
              </motion.div>
            </OttWrapper>
          ))}
          <OthersOTT>
            <label htmlFor="othersOttText">ott</label>
            <OthersOttText
              type="text"
              name="othersOtt"
              id="othersOttText"
              placeholder="직접 입력"
              value={
                selectedOtt.length > 0
                  ? selectedOtt[selectedOtt.length - 1]
                  : ''
              }
              onChange={handleInputOtt}
            ></OthersOttText>
          </OthersOTT>
        </Wrapper>

        <TitleDiv>
          {!selectMovie && `영화 또는 드라마 제목을 검색해주세요`}
          {(selectMovie && selectMovie.title) || selectMovie?.name}
        </TitleDiv>

        <BtnWrapper onClick={handleSelectImg}>
          <ImgSelectBtn
            color={isSelectImg ? '#3797EF' : ''}
            $hasBorder
            onClick={handleSelectDefaultImg}
          >
            기본 이미지
          </ImgSelectBtn>
          <ImgSelectBtn
            color={isSelectImg ? '' : '#3797EF'}
            onClick={handleSelectUserImg}
          >
            사용자 이미지
          </ImgSelectBtn>
        </BtnWrapper>
        <OriginalImage>
          {selectMovie && isSelectImg ? (
            <MoviePoster
              src={`https://image.tmdb.org/t/p/original/${selectMovie.poster_path}`}
              alt={`${selectMovie.title || selectMovie.name} 포스터`}
            />
          ) : (
            selectMovie && (
              <>
                <MoviePoster
                  src={imgSrc}
                  alt={`${selectMovie.title || selectMovie.name} 관련 이미지`}
                />
                <div>
                  <label htmlFor="photo">사진</label>
                  <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    name="photo"
                    id="photo"
                    onChange={handleUpload}
                  ></input>
                </div>
              </>
            )
          )}
        </OriginalImage>

        <StarContainer>
          평점을 선택해주세요 <StarRating onRatingChange={handleRatingChange} />
        </StarContainer>

        <FeedText
          ref={textareaRef}
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
    </section>
  )
}

export default Writing

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

const ResultBarContain = styled.div<ResultBarContainProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  &:hover {
    background: ${({ $darkMode }) => ($darkMode ? '#28C7C7' : '#fffc9f')};
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

const NoResultsMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
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
  gap: 5px;
  flex-wrap: wrap;
`

const OttWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 8px;
`

const IconBox = styled.div`
  width: 28px;
  height: 28px;
  position: relative;
`
const OttLabel = styled.label``

const OttInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`
const OthersOTT = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  align-items: center;
  font-size: 14px;
  padding: 0px 8px;
  gap: 3px;
`

const OthersOttText = styled.input`
  width: 100%;
`

const OttIcon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const TitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;
  height: 50px;
  font-size: 20px;
  font-weight: 600;
  @media (min-width: 701px) {
    max-width: 390px;
  }
`

const BtnWrapper = styled.div`
  display: flex;
`

const ImgSelectBtn = styled.button<{ $hasBorder?: boolean; color?: string }>`
  width: 195px;
  height: 44px;
  color: black;
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
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const StarContainer = styled.div`
  width: 370px;
  padding: 30px 10px 10px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
`

const FeedText = styled.textarea`
  width: 390px;
  overflow: hidden;
  border: none;
  box-sizing: border-box;
  border-radius: 5px;
  font-size: 16px;
  resize: none;
  padding: 10px;
`

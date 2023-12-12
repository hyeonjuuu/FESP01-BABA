import { useEffect, useState } from 'react'
import styled from 'styled-components'
import ottIcons from '@/utils/ottIconImage'
import { ottIconNames } from '@/utils/ottIconImage'
import Button from '@/components/Button'
import { addReview } from '@/api/reviewApi'
import getMovieImage from '@/api/getMovieImage'
import { useNavigate } from 'react-router-dom'

function Writing() {
  const naviagte = useNavigate()

  const [text, setText] = useState('')
  const [selectedOtt, setSelectedOtt] = useState<string[]>([])
  const [movieImage, setMovieImage] = useState()

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

  //# 영화 기본 이미지
  // search 에서 props로 넘겨주면 해당 이미지가 뜨도록
  const handleMovieImage = async () => {
    try {
      const movieImageData = await getMovieImage()
      const firstPosterPath = movieImageData.posters[0].file_path

      setMovieImage(firstPosterPath)
      // console.log(movieImageData)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    handleMovieImage()
  }, [])

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
        selectedOtt
      )
      naviagte('/main')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Container>
      {/* <FormStyle encType="multipart/form-data"> */}
      <FormStyle>
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
          {movieImage && (
            <MoviePoster
              src={`https://image.tmdb.org/t/p/original${movieImage}`}
              alt="Movie Poster"
            />
          )}
        </OriginalImage>

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
  height: 390px;
  background-color: #d9d9d9;
  position: relative;
`

const MoviePoster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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

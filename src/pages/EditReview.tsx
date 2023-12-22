import { motion } from 'framer-motion'
import styled from 'styled-components'
import ottIcons from '@/utils/ottIconImage'
import { PlzSelectImgDiv } from './Writing'
import convertDate from '@/utils/convertDate'
import StarRating from '@/components/StarRating'
import { supabase } from '@/utils/supabaseClient'
import useThemeStore from '@/store/useThemeStore'
import { ottIconNames } from '@/utils/ottIconImage'
import { useEffect, useRef, useState } from 'react'
import { getReviewDataForEdit } from '@/api/getReviewData'
import { useLocation, useNavigate } from 'react-router-dom'
import { faImage } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  deleteReview,
  editReview,
  editReviewWithImgUrl,
  getMovieImgUrl,
  uploadImage
} from '@/api/reviewApi'

interface DateWrapperProps {
  $darkMode: boolean
}

function EditReview() {
  const { $darkMode } = useThemeStore()

  const naviagte = useNavigate()
  const location = useLocation()
  const { review } = location.state

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const movieId = review.movie_id
  const reviewId = review.id
  const userId = review.user_id

  const [addDate, setAddDate] = useState<string>('')
  const [updateDate, setUpdateDate] = useState<string>('')
  const [selectedOtt, setSelectedOtt] = useState<string[]>([])
  const [title, setTitle] = useState<string | null>(null)
  const [defaultImg, setDefaultImg] = useState<string | null>(null)
  const [userImg, setUserImg] = useState<string | null>(null)
  const [isSelectImg, setIsSelectImg] = useState<boolean>(false)
  const [image, setImage] = useState<File | null>(null)
  const [imgSrc, setImgSrc]: any = useState(null)
  const [isImageDeleted, setImageDeleted] = useState(false)
  const [rating, setRating] = useState<number>(0)
  const [text, setText] = useState<string | null>(null)

  useEffect(() => {
    const fetchReviewdata = async () => {
      const reviewInfo = await getReviewDataForEdit(reviewId)

      const addDate = reviewInfo[0]?.created_at
      const updateDate = reviewInfo[0]?.updated_at
      const ott = reviewInfo[0]?.ott
      const title = reviewInfo[0]?.movie_title
      const img = reviewInfo[0]?.img_url || null
      const rating = reviewInfo[0]?.rating
      const text = reviewInfo[0]?.text

      setAddDate(convertDate(addDate))
      if (updateDate) {
        setUpdateDate(convertDate(updateDate))
      }
      setSelectedOtt(ott)
      setTitle(title)
      setDefaultImg(reviewInfo[0]?.default_img)
      setUserImg(img)
      setRating(rating)
      setText(text)
      setIsSelectImg(img !== null)
    }

    fetchReviewdata()
  }, [])

  //# 이미지 선택
  const handleSelectImg = (e: React.MouseEvent) => {
    e.preventDefault()
  }

  const handleSelectDefaultImg = () => {
    setIsSelectImg(false)
  }

  const handleSelectUserImg = () => {
    setIsSelectImg(true)
  }

  // 이미지 미리보기
  const handleUpload = (e: any) => {
    const file = e.target.files[0]

    setImage(file)
    const reader = new FileReader()
    reader.readAsDataURL(file)

    return new Promise<void>(resolve => {
      reader.onload = () => {
        setImgSrc(reader.result || null)
        resolve()
      }
    })
  }

  const handleDeleteImg = async () => {
    const confirmed = window.confirm('이미지를 삭제하시겠습니까?')

    if (confirmed) {
      const oldImgUrl = await getMovieImgUrl(userId)

      if (oldImgUrl) {
        const oldImgName = oldImgUrl.split('/').pop()
        await supabase.storage
          .from('movieImage')
          .remove([`public/${oldImgName}`])
      }

      setUserImg(null)
      setImgSrc(null)
      setImage(null)
      setImageDeleted(true)
    }
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
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '100px'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [text])

  //# 리뷰 수정
  const handleEdit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const ottValue = selectedOtt
    const textValue = text

    if (ottValue.length === 0 || rating === 0 || textValue === '') {
      alert('ott, 평점, 내용을 작성해주세요')
      return
    }

    try {
      if (!imgSrc && !isImageDeleted) {
        // 이미지가 삭제되지 않았고, 새 이미지가 선택되지 않은 경우
        await editReview(
          movieId,
          userId,
          text!,
          selectedOtt,
          rating,
          title!,
          reviewId
        )
      } else if (imgSrc) {
        // 새 이미지가 선택된 경우
        const imgUrl = await uploadImage(image!)

        await editReviewWithImgUrl(
          movieId,
          userId,
          text!,
          selectedOtt,
          rating,
          title!,
          imgUrl,
          reviewId
        )
      } else if (isImageDeleted) {
        // 이미지가 삭제된 경우
        await editReviewWithImgUrl(
          movieId,
          userId,
          text!,
          selectedOtt,
          rating,
          title!,
          null,
          reviewId
        )
      }

      alert('리뷰가 수정되었습니다!😊')
      naviagte('/main')
    } catch (error) {
      console.error(error)
      alert('리뷰 수정에 실패했습니다..😭')
    }
  }

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const isConfirmed = window.confirm('리뷰를 삭제하시겠습니까?')

    if (isConfirmed) {
      try {
        await deleteReview(reviewId, userId)
        alert('리뷰가 삭제되었습니다!😊')
        naviagte('/mypage')
      } catch (error) {
        console.error(error)
        alert('리뷰 삭제에 실패했습니다..😭')
      }
    }
  }

  return (
    <section>
      <FormStyle encType="multipart/form-data">
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

        <TitleDiv>{title}</TitleDiv>
        <DateWrapper $darkMode={$darkMode}>
          <AddDateDiv>등록: {addDate}</AddDateDiv>
          {updateDate && <EditDateDiv>수정: {updateDate}</EditDateDiv>}
        </DateWrapper>

        <BtnWrapper onClick={handleSelectImg}>
          <ImgSelectBtn
            color={!isSelectImg ? '#3797EF' : ''}
            $hasBorder
            onClick={handleSelectDefaultImg}
          >
            기본 이미지
          </ImgSelectBtn>
          <ImgSelectBtn
            color={isSelectImg ? '#3797EF' : ''}
            onClick={handleSelectUserImg}
          >
            사용자 이미지
          </ImgSelectBtn>
        </BtnWrapper>

        <OriginalImage>
          {isSelectImg ? (
            <>
              {imgSrc || userImg ? ( // 사용자가 이미지를 업로드한 경우
                <MoviePoster
                  src={
                    imgSrc ||
                    `https://ufinqahbxsrpjbqmrvti.supabase.co/storage/v1/object/public/movieImage/${userImg}`
                  }
                  alt={`${title} 관련 이미지`}
                  onClick={handleDeleteImg}
                />
              ) : (
                // 사용자가 이미지를 업로드하지 않은 경우
                <PlzSelectImgDiv>
                  <FontAwesomeIcon icon={faImage} />
                </PlzSelectImgDiv>
              )}
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
          ) : (
            <MoviePoster
              src={`https://image.tmdb.org/t/p/original/${defaultImg?.replace(
                'public/',
                ''
              )}`}
              alt={`${title} 포스터`}
            />
          )}
        </OriginalImage>

        <StarContainer>
          평점을 선택해주세요{' '}
          <StarRating
            onRatingChange={handleRatingChange}
            initialRating={rating}
          />
        </StarContainer>

        <FeedText
          ref={textareaRef}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="이 컨텐츠에 대한 생각을 자유롭게 공유해보세요!🎬✨"
          onChange={handleInputChange}
          value={text || ''}
        ></FeedText>

        <ButtonWrapper>
          <ButtonStyle onClick={handleEdit}>수정하기</ButtonStyle>
          <ButtonStyle onClick={handleDelete}>삭제하기</ButtonStyle>
        </ButtonWrapper>
      </FormStyle>
    </section>
  )
}

export default EditReview

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
  gap: 5px;
  flex-wrap: wrap;
`

const DateWrapper = styled.div<DateWrapperProps>`
  width: 390px;
  color: ${({ $darkMode }) => ($darkMode ? '#E0E0E0' : '#777777')};
`

const AddDateDiv = styled.div``

const EditDateDiv = styled.div``
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
const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`

const ButtonStyle = styled.button`
  width: 180px;
  height: 48px;
  border: 0.5px solid black;
  border-radius: 5px;
  font-family: 'GmarketSans';
  font-size: 16px;
  border: 1.5px solid #bcbcbc;
  margin-top: 10px;

  &:hover {
    background-color: #3797ef;
  }
`

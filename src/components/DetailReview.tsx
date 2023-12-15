import styled from 'styled-components'
import useThemeStore from '@/store/useThemeStore'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface ReviewContentProps {
  $darkMode: boolean
}

interface DetailReviewProps {
  nickname?: string
  rating?: string
  text: string
}

function DetailReview({ nickname, rating, text }: DetailReviewProps) {
  const { $darkMode } = useThemeStore()

  return (
    <DetailReviewDivWrapper>
      <Img
        src="https://picsum.photos/id/237/200/300"
        alt="피드 이미지"
        width="100%"
        height="100%"
        object-fit="cover"
      ></Img>

      <DetailReviewDiv>
        <NameStartDiv>
          <div>{nickname}</div>
          <StarDiv>
            <FontAwesomeIcon icon={faStar} style={{ color: '#FFC61A' }} />
            <span>{rating}</span>
          </StarDiv>
        </NameStartDiv>

        <ReviewContent $darkMode={$darkMode}>{text}</ReviewContent>
      </DetailReviewDiv>
    </DetailReviewDivWrapper>
  )
}

export default DetailReview

const DetailReviewDivWrapper = styled.div`
  display: flex;
  width: 370px;
  height: 130px;
  margin: 0 auto;
  border: solid 1.5px;
  border-radius: 5px;
`

const Img = styled.img`
  width: 120px;
  height: 100%;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`

const DetailReviewDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
`

const NameStartDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
`

const StarDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`

const ReviewContent = styled.div<ReviewContentProps>`
  color: ${({ $darkMode }) => ($darkMode ? '#E0E0E0' : '#777777')};
  text-align: start;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`

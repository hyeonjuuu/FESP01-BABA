import styled from 'styled-components'
import useThemeStore from '@/store/useThemeStore'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface ReviewContentProps {
  $darkMode: boolean
}

function DetailReview() {
  const { $darkMode } = useThemeStore()

  return (
    <DetailReviewDivWrapper>
      <ImgDiv>
        <img
          src="https://picsum.photos/id/237/200/300"
          alt="피드 이미지"
          width="100%"
          height="100%"
          object-fit="cover"
        ></img>
      </ImgDiv>
      <DetailReviewDiv>
        <NameStartDiv>
          <div>UserName</div>
          <StarDiv>
            <FontAwesomeIcon icon={faStar} style={{ color: '#FFC61A' }} />
            <span>4.5</span>
          </StarDiv>
        </NameStartDiv>

        <ReviewContent $darkMode={$darkMode}>
          리뷰 내용입니다.리뷰 내용입니다.리뷰 내용입니다. 리뷰 내용입니다. 리뷰
          내용입니다. 리뷰 내용입니다.리뷰 내용입니다. 리뷰 내용입니다. 리뷰
          내용입니다. 리뷰 내용입니다. 리뷰 내용입니다. 리뷰 내용입니다.
        </ReviewContent>
      </DetailReviewDiv>
    </DetailReviewDivWrapper>
  )
}

export default DetailReview

const DetailReviewDivWrapper = styled.div`
  display: flex;
  width: 370px;
  height: 130px;
  margin: auto;
  border: solid 1px black;
  border-radius: 5px;
  margin-bottom: 20px;
`

const ImgDiv = styled.div`
  width: 120px;
  height: 100%;
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

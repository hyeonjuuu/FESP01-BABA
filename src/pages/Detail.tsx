import styled from 'styled-components'
import useThemeStore from '../store/useThemeStore'
import DetailReview from '@/components/DetailReview'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons'

interface DirectorDivProps {
  $darkMode: boolean
}

function Detail() {
  const { $darkMode } = useThemeStore()

  return (
    <>
      <DetailDivWrapper>
        <DetailH2>미션 임파서블 : 데드 레코닝 PART ONE</DetailH2>
        <StarDiv>
          <FontAwesomeIcon icon={faStar} style={{ color: '#FFC61A' }} />
          <FontAwesomeIcon icon={faStar} style={{ color: '#FFC61A' }} />
          <FontAwesomeIcon icon={faStar} style={{ color: '#FFC61A' }} />
          <FontAwesomeIcon icon={faStar} style={{ color: '#FFC61A' }} />
          <FontAwesomeIcon
            icon={faStarHalfStroke}
            style={{ color: '#FFC61A', stroke: 'black' }}
          />
          <span>4.5</span>
        </StarDiv>
        <ImgDiv>
          <img
            src="https://picsum.photos/seed/picsum/200/300"
            alt="영화 이미지"
            width="100%"
            height="100%"
            object-fit="cover"
          ></img>
        </ImgDiv>

        <MovieInfoDiv>
          <CertificationDiv>15</CertificationDiv>
          <span>|</span>
          2023
          <span>|</span>
          액션 &middot; 스릴러
          <span>|</span>
          2시간 44분
        </MovieInfoDiv>
        <DirectorInfoDiv>
          <DirectorDiv $darkMode={$darkMode}>
            감독
            <span>|</span>
          </DirectorDiv>
          크리스토퍼 맥쿼리
        </DirectorInfoDiv>
      </DetailDivWrapper>

      <DetailReview />
      <DetailReview />
      <DetailReview />
      <DetailReview />
      <DetailReview />
    </>
  )
}

export default Detail

const DetailDivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  height: auto;
  margin: auto;
  padding-bottom: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid black;
`

const DetailH2 = styled.h2`
  font-size: 22px;
  text-align: start;
`

const StarDiv = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 5px;
`

const ImgDiv = styled.div`
  width: 100%;
  height: 320px;
`

const MovieInfoDiv = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 5px;
  padding: 10px 10px 0 0;
`

const CertificationDiv = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  padding: 0 2px;
`

const DirectorInfoDiv = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 5px;
`

const DirectorDiv = styled.div<DirectorDivProps>`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 5px;
  color: ${({ $darkMode }) => ($darkMode ? '#E0E0E0' : '#777')};
`

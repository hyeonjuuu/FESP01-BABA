import { MovieInfo } from '@/types'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { findMovieDirector, getDetailData } from '@/api/tmdbDetailData'
// import { getReviewData, getReviewDataWithUserInfo } from '@/api/getReviewData'
import poster from '@/assets/midnight.jpeg'
import CastInfo from '@/components/movieInfo/CastInfo'
import { useEffect, useState } from 'react'
import { getMovieCrew } from '@/api/tmdbDetailData'
import { getTrailer } from '@/api/getTrailer'
import Iframe from '@/components/movieInfo/Iframe'

function MovieInfo() {
  const { id: movieID } = useParams()

  const [reviewData, setReviewData] = useState<any[] | null>(null)
  const [nicknames, setNicknames] = useState<any[] | null | undefined>(null)
  const [movieinfoData, setMovieInfoData] = useState<MovieInfo | null>(null)
  const [movieCreditData, setMovieCreditData] = useState<string | undefined>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showMore, setShowMore] = useState(false)
  const [castData, setCastData] = useState<any[] | undefined>()
  const [trailers, setTrailers] = useState<any[] | null>([])

  const toggleShowMore = () => {
    setShowMore(!showMore)
  }

  useEffect(() => {
    const getMovieInfoData = async () => {
      try {
        const response = await getDetailData('59436')
        const director = await findMovieDirector('59436')

        if (response) {
          const data = response.data
          setMovieInfoData(data)
          setMovieCreditData(director)
        }
      } catch (error) {
        console.error(
          `상세정보 데이터를 가져오는데 실패하였습니다...🥲: ${error}`
        )
      }
    }

    getMovieInfoData()
  }, [movieID])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setIsLoading(true)
  //       const data = await getReviewData()
  //       const nicknameData = await getReviewDataWithUserInfo()
  //       setReviewData(data)
  //       setNicknames(nicknameData)
  //     } catch (error) {
  //       console.error(error)
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }

  //   fetchData()
  // }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMovieCrew('59436')
        // const trailerData = await getTrailer('미드나잇 인 파리 예고편')

        setCastData(data)
        // setTrailers(trailerData)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [movieID])

  console.log(trailers)

  return (
    <Container>
      <Wrapper>
        <Img src={poster} alt="미드나잇 인 파리" />
        <GradientOverlay />
        <InfoContainer>
          <h2>미드나잇 인 파리</h2>
          <div>
            <span>평균</span> · <span>2011</span> · <span>1시간 30분</span> ·{' '}
            <span>코미디</span> · <span>로맨스</span>
          </div>
          <p>
            {showMore
              ? movieinfoData?.overview
              : `${movieinfoData?.overview.slice(0, 100)}...`}
          </p>
          <MoreButton onClick={toggleShowMore}>더 보기</MoreButton>
        </InfoContainer>
      </Wrapper>
      <RelatedVideos>
        {/* 여기에 관련 영상 컴포넌트를 추가하세요 */}
        <h3>관련 영상</h3>
        {trailers?.map(item => (
          <Iframe key={item.videoId} videoId={item.videoId} />
        ))}
      </RelatedVideos>
      <CastAndCrew>
        {/* 여기에 감독/출연 정보 컴포넌트를 추가하세요 */}

        <h3>감독 및 출연</h3>
        {/* 예시: */}
        {castData?.map(info => (
          <CastInfo
            key={info.id}
            profile={info.profile_path}
            name={info.name}
            character={info.character}
          />
        ))}
      </CastAndCrew>
    </Container>
  )
}

export default MovieInfo

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: relative;
  margin: 0 10px;
`

const Wrapper = styled.div`
  position: relative;
  height: 600px;
  width: 100%;

  display: flex;

  @media (max-width: 700px) {
    flex-direction: column;
    margin-bottom: 190px;
  }
`

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.7)
  );
  pointer-events: none;
  z-index: 1;

  @media (min-width: 701px) {
    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 1)
    );
  }
`

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
  z-index: 0;

  @media (min-width: 701px) {
    order: 2;
    flex: 1; /* 데스크탑에서는 Img가 남은 공간을 모두 차지하도록 조절 */
  }
`

const InfoContainer = styled.section`
  position: relative;
  z-index: 2;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  margin-top: -60px; /* 이미지와 겹치도록 조절 */

  @media (min-width: 701px) {
    order: 1;
    margin-top: 0; /* 데스크탑에서는 margin-top 조절이 필요 없음 */
    flex: 2; /* 데스크탑에서는 InfoContainer가 Img보다 두 배의 너비를 갖도록 조절 */
  }
`

const RelatedVideos = styled.div`
  margin-top: 20px;
`

const CastAndCrew = styled.div`
  margin-top: 20px;

  @media (min-width: 1030px) {
    display: none;
  }
`

const MoreButton = styled.button`
  background-color: #0070f3;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
`

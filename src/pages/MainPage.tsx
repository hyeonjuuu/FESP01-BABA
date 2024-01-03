import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useGenresStore } from '@/store/useGenresStore'
import { getGenreReviewData, getReviewData } from '@/api/getReviewData'
import Header from '@/layout/Header'
import getTrendingData from '@/api/getTrendingData'
import SwiperCore from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import { Autoplay, EffectCoverflow } from 'swiper/modules'
import { TrendDataState, useTrendDataStore } from '@/store/useTrendDataStore'

SwiperCore.use([Autoplay, EffectCoverflow])

interface SwiperProps {
  justifycontent: string
}

function Main() {
  const [, setWindowWidth] = useState(window.innerWidth)
  const { movieGenresState } = useGenresStore()
  const { trendData, setTrendData } = useTrendDataStore()

  const movieGenresStateId = movieGenresState[0]?.id
  const [reviews, setReviews] = useState<ReviewData[]>([])

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const trendingData = async () => {
      const data = await getTrendingData()

      const posterResult = data.results.map(
        (item: { poster_path: string }) =>
          `https://image.tmdb.org/t/p/original/${item.poster_path}`
      )
      setTrendData(data.results)
    }
    const loadReviewData = async () => {
      try {
        let reviewData: ReviewData[] = []
        if (movieGenresStateId) {
          const genreReviewData = await getGenreReviewData(movieGenresStateId)

          if (!genreReviewData) {
            throw new Error('해당 카테고리의 리뷰가 없습니다.')
          }

          reviewData = genreReviewData
        } else if (movieGenresStateId === undefined) {
          const getAllReviewData = await getReviewData()
          if (!getAllReviewData) {
            throw new Error('리뷰 데이터를 불러올 수 없습니다.')
          }

          reviewData = getAllReviewData
        }

        setReviews(reviewData)
      } catch (err) {
        console.error('데이터 불러오기 실패')
        return null
      }
    }
    trendingData()
    loadReviewData()

    window.scrollTo(0, 0)
  }, [movieGenresState])

  let doubleTrendData = trendData?.concat(trendData, trendData)
  console.log(doubleTrendData)

  return (
    <MainWrapper>
      <MainPageTitle aria-label="메인페이지">메인 페이지</MainPageTitle>
      <PosterWrapper>
        <TitleContentsWrapper>
          <HeaderBox>
            <Header />
            <SubTitle>Find Your Contents Fit.</SubTitle>
          </HeaderBox>
          <TitleWrapper>
            <Title>CONFIT</Title>
            <CircleDiv></CircleDiv>
          </TitleWrapper>
        </TitleContentsWrapper>
        {doubleTrendData.length > 0 && (
          <SwiperWrapper
            slidesPerView={3.4}
            centeredSlides={true}
            spaceBetween={30}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false
            }}
            freeMode={true}
            modules={[EffectCoverflow]}
            effect="fade"
            speed={1000}
            loopAdditionalSlides={3}
            loop={true}
          >
            {doubleTrendData?.map((item, index) => (
              <SwiperSlideContainer key={index} justifycontent="center">
                <TrendPosterImg
                  src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                  alt={item.name || item.title}
                />
              </SwiperSlideContainer>
            ))}
          </SwiperWrapper>
        )}
      </PosterWrapper>
    </MainWrapper>
  )
}

export default Main

const MainWrapper = styled.div`
  background-color: #edece8;
  height: 100vh;
`

const MainPageTitle = styled.h1`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`

const TitleContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
`

const TitleWrapper = styled.div`
  display: flex;
`

const HeaderBox = styled(TitleWrapper)`
  flex-direction: row;
  justify-content: space-between;
`

const Title = styled.span`
  font-size: 108px;
  font-family: 'Josefin Sans', sans-serif;
  font-weight: 700;
  display: inline-block;
  box-sizing: border-box;
  color: #222222;
`
const CircleDiv = styled.div`
  display: flex;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  align-self: flex-end;
  background-color: #aaeec4;
  margin: 0 0 20px 4px;
`

const SubTitle = styled(Title)`
  font-size: 56px;
  color: #999999;
  font-weight: 400;
  padding: 10px 0 0 0;
  font-weight: 200;
  order: -1;
`
const PosterWrapper = styled.section`
  padding: 20px;
`

const SwiperWrapper = styled(Swiper)`
  .swiper-slide-active {
    & > img {
      transition: filter;
      transition-delay: 1.5s ease;
      filter: grayscale(0) opacity(100);
      transform: scale(1.06);
      transition: 1s all ease;
    }
  }
`

const SwiperSlideContainer = styled(SwiperSlide)<SwiperProps>`
  display: flex;
  align-items: center;
  justify-content: ${({ justifycontent }) => justifycontent};
  overflow: hidden;
  transition: 0.5s all ease;
  border-radius: 10px;
`

const TrendPosterImg = styled.img`
  width: 480px;
  height: 688px;
  border-radius: 10px;
  filter: grayscale(100%) opacity(70%);
  transition: 0.5s all ease;
  &:hover {
    transition: filter;
    transition: 1.2s all ease;
    transition-delay: 1s ease;
    filter: grayscale(0) opacity(100);
    transform: scale(1.06);
  }
`

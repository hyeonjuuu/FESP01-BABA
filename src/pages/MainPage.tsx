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
import { isHtmlElement } from 'react-router-dom/dist/dom'
import { useTrendDataStore } from '@/store/useTrendDataStore'

SwiperCore.use([Autoplay, EffectCoverflow])

interface SwiperProps {
  justifycontent: string
}

function Main() {
  const [, setWindowWidth] = useState(window.innerWidth)
  const { movieGenresState } = useGenresStore()
  const { trendData, setTrendData, reverseTrendData, setReverseData } =
    useTrendDataStore()
  const movieGenresStateId = movieGenresState[0]?.id
  const [reviews, setReviews] = useState<ReviewData[]>([])
  const [trendPoster, setTrendPoster] = useState<string[]>()

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

      // console.log(data.results)

      const posterResult = data.results.map(
        (item: { poster_path: string }) =>
          `https://image.tmdb.org/t/p/original/${item.poster_path}`
      )
      setTrendPoster(posterResult)
      setTrendData(data.results)
      setReverseData(data.results)
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
  // console.log(trendPoster)
  console.log('reverse', reverseTrendData.reverse())
  console.log(trendPoster)

  return (
    <MainWrapper>
      <MainPageTitle aria-label="메인페이지">메인 페이지</MainPageTitle>
      <Header />
      <PosterWrapper>
        <Swiper
          slidesPerView={1}
          centeredSlides={true}
          spaceBetween={30}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false
          }}
          freeMode={true}
          modules={[EffectCoverflow]}
        >
          {trendPoster?.map((item, index) => (
            <SwiperSlideContainer key={index} justifycontent="center">
              <TrendPosterImg src={item} alt="" />
            </SwiperSlideContainer>
          ))}
        </Swiper>
        <Swiper
          slidesPerView={1}
          centeredSlides={true}
          spaceBetween={30}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false
          }}
          freeMode={true}
          modules={[EffectCoverflow]}
        >
          {reverseTrendData?.map((item, index) => (
            <SwiperSlideContainer key={index} justifycontent="start">
              <TrendPosterImgLarge
                src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                alt={item.name || item.title}
              />
            </SwiperSlideContainer>
          ))}
        </Swiper>
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
const PosterWrapper = styled.section`
  display: flex;
  padding: 20px;
`

const SwiperSlideContainer = styled(SwiperSlide)<SwiperProps>`
  border: 5px solid black;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: ${({ justifycontent }) => justifycontent};
`

const TrendPosterImg = styled.img`
  height: 586px;
`

const TrendPosterImgLarge = styled.img`
  height: 780px;
`

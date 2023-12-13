import styled from 'styled-components'
import useThemeStore from '../store/useThemeStore'
import { useEffect, useRef, useState } from 'react'
import getPopularData from '@/api/getPopularData'
import {
  SwiperSlideWrapper,
  SwiperWrapper
} from '@/components/CategoryComponent'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

interface SectionHeaderWidth {
  width?: string
  $darkMode: boolean
}

function RecommendContentsSection() {
  const [populardata, setPopularData] = useState<PopularData>()

  useEffect(() => {
    const popularDataFetching = async () => {
      const response = await getPopularData()
      setPopularData(response)
    }
    popularDataFetching()
  }, [])

  const handleMouseHoverImage: React.MouseEventHandler<HTMLElement> = e => {
    const target = e.target
  }

  const { $darkMode } = useThemeStore()

  return (
    <SectionWrapper>
      <SectionHeader width="32px" $darkMode={$darkMode}>
        추천
      </SectionHeader>
      <SwiperWrapper
        slidesPerView={5}
        spaceBetween={2}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false
        }}
        pagination={{
          type: 'progressbar'
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        breakpoints={{
          320: {
            slidesPerView: 3.5,
            spaceBetween: 0
          },
          520: {
            slidesPerView: 6
          },
          768: {
            slidesPerView: 8
          },
          1020: {
            slidesPerView: 7
          },
          1280: {
            slidesPerView: 10
          }
        }}
      >
        {populardata?.results.map(item => (
          <SwiperSlideWrapper key={item.id}>
            <RecommendImage
              src={`https://image.tmdb.org/t/p/w220_and_h330_face${item.poster_path}`}
              alt={`${item.title} 포스터`}
              onMouseOver={handleMouseHoverImage}
            />
            <RecommendTitle>{item.title}</RecommendTitle>
          </SwiperSlideWrapper>
        ))}
      </SwiperWrapper>
    </SectionWrapper>
  )
}

export default RecommendContentsSection

const SectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  @media (min-width: 1280px) and (max-width: 1920px) {
    max-width: 720px;
    min-width: 610px;
    width: 100%;
  }
  @media (min-width: 1025px) and (max-width: 1279px) {
    max-width: 610px;
    min-width: 580px;
    width: 100%;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    max-width: 680px;
    width: 100%;
    min-width: 620px;
  }
  @media (min-width: 520px) and (max-width: 767px) {
    max-width: 520px;
    width: 100%;
  }
  @media (min-width: 320px) and (max-width: 519px) {
    max-width: 320px;
    width: 100%;
  }
`

const SectionHeader = styled.h2<SectionHeaderWidth>`
  font-size: 16px;
  margin: 0;
  height: 30px;
  display: flex;
  flex-flow: column;
  align-items: flex-start;

  &:after {
    content: '';
    display: block;
    width: ${({ width }) => width};
    border-bottom: 5px solid #303032;
    border-color: ${({ $darkMode }) => ($darkMode ? '#FFFFFF' : '#303032')};
  }
`

const RecommendTitle = styled.span`
  visibility: hidden;
  font-size: 12px;
  text-align: center;
  color: white;
  padding: 4px;
  background-color: green;
  margin: 4px;
`

const RecommendImage = styled.img`
  width: 80px;
  height: 120px;
  border-radius: 5px;
  margin-left: 4px;
  margin-right: 4px;

  &:hover {
    filter: saturate(0%) brightness(50%);
    transition: 0.5s;
    display: flex;

    ~ ${RecommendTitle} {
      visibility: visible;
    }
  }
`

import styled from 'styled-components'
import useThemeStore from '../store/useThemeStore'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import { useState } from 'react'

export interface FontProps {
  fontSize?: string
  fontWeight?: string
  $darkMode?: boolean
}

interface SizeProps {
  size?: string
  $darkMode: boolean
}

function CategoryComponent() {
  const { $darkMode } = useThemeStore()
  const [selectCategory, setSelectCategory] = useState('영화')
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // const select = document.getElementById('영화드라마')
    const select = e.currentTarget.value
    setSelectCategory(select)
  }

  const movieCategories = [
    { color: '#F56A1E', text: '액션' },
    { color: '#FFE100', text: '어드벤쳐', fontSize: '12px' },
    { color: '#3FD6A6', text: '애니메이션', fontSize: '11px' },
    { color: '#FF99AF', text: '코미디' },
    { color: '#DF461F', text: '범죄' },
    { color: '#496BF2', text: '다큐' },
    { color: '#77B1B9', text: '드라마' },
    { color: '#CEE319', text: '가족' },
    { color: '#69A7E7', text: '판타지' },
    { color: '#7B5F48', text: '역사' },
    { color: '#AD2625', text: '호러' },
    { color: '#A28CB7', text: '음악' },
    { color: '#177649', text: '미스테리' },
    { color: '#F4D6D4', text: '로맨스' },
    { color: '#513582', text: 'SF' },
    { color: '#F5E2A7', text: 'TV Movie', fontSize: '11px' },
    { color: '#F03F36', text: '스릴러' },
    { color: '#015097', text: '전쟁' }
  ]
  const dramaCategories = [
    { color: '#F56A1E', text: '액션&어드벤쳐', fontSize: '12px' },
    { color: '#3FD6A6', text: '애니메이션', fontSize: '12px' },
    { color: '#FF99AF', text: '코미디' },
    { color: '#DF461F', text: '범죄' },
    { color: '#496BF2', text: '다큐' },
    { color: '#77B1B9', text: '드라마' },
    { color: '#CEE319', text: '가족' },
    { color: '#69A7E7', text: '키즈' },
    { color: '#177649', text: '미스테리' },
    { color: '#F4D6D4', text: '뉴스' },
    { color: '#513582', text: '리얼리티' },
    { color: '#F5E2A7', text: '판타지' },
    { color: '#F03F36', text: '오페라' },
    { color: '#015097', text: '토크' },
    { color: '#015097', text: '전쟁&정치' }
  ]
  return (
    <CategorySection>
      <CategoryTitle>
        <SectionHeader size="62px" $darkMode={$darkMode}>
          카테고리
        </SectionHeader>
        <form action="#">
          <label htmlFor="영화/드라마" aria-label="선택하세요"></label>
          <SelectLabel
            name="languages"
            id="영화/드라마"
            onChange={handleChange}
          >
            <option value="영화">영화</option>
            <option value="드라마">드라마</option>
          </SelectLabel>
        </form>
      </CategoryTitle>
      <SwiperWrapper
        slidesPerView={5}
        spaceBetween={2}
        modules={[Pagination]}
        className="mySwiper"
        breakpoints={{
          520: {
            slidesPerView: 6,
            spaceBetween: 0
          },
          768: {
            slidesPerView: 8,
            spaceBetween: 0
          },
          1020: {
            slidesPerView: 7,
            spaceBetween: 0
          },
          1280: {
            slidesPerView: 10,
            spaceBetween: 0
          }
        }}
      >
        {selectCategory === '영화'
          ? movieCategories.map(({ color, text, fontSize }, index) => (
              <SwiperSlideWrapper key={index} style={{ width: 'auto' }}>
                <CategoryCircle color={color}></CategoryCircle>
                <CategroyList fontSize={fontSize} $darkMode={$darkMode}>
                  {text}
                </CategroyList>
              </SwiperSlideWrapper>
            ))
          : dramaCategories.map(({ color, text, fontSize }, index) => (
              <SwiperSlideWrapper key={index} style={{ width: 'auto' }}>
                <CategoryCircle color={color}></CategoryCircle>
                <CategroyList fontSize={fontSize} $darkMode={$darkMode}>
                  {text}
                </CategroyList>
              </SwiperSlideWrapper>
            ))}
      </SwiperWrapper>
    </CategorySection>
  )
}

export default CategoryComponent

const CategorySection = styled.section`
  margin: 36px auto 0 auto;
  max-width: 1020px;
`

const SectionHeader = styled.h2<SizeProps>`
  color: #303032;
  font-size: 16px;
  margin: 0;
  padding: 0;
  display: flex;
  flex-flow: column;
  align-items: flex-start;

  &:after {
    content: '';
    display: block;
    width: ${({ size }) => size};
    border-bottom: 5px solid #303032;
    border-color: ${({ $darkMode }) => ($darkMode ? '#FFFFFF' : '#303032')};
  }
`

const CategoryTitle = styled.div`
  display: flex;
  justify-content: space-between;
  flex-flow: row;
  align-content: center;
`

const SelectLabel = styled.select`
  border: none;
  font-family: GmarketSans;
  color: #28c7c7;
`

const CategroyList = styled.div<FontProps>`
  text-align: center;
  color: #444444;
  font-weight: 300;
  font-size: ${props => (props.fontSize ? props.fontSize : '14px')};
`
const CategoryCircle = styled.div`
  height: 56px;
  width: 56px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  align-self: center;
  margin-bottom: 4px;
  margin: 4px auto;
`
export const SwiperWrapper = styled(Swiper)`
  display: flex;
  flex-direction: column;
  margin: 0 6px;

  @media (min-width: 1921px) {
    max-width: 720px;
    min-width: 610px;
    width: 100%;
    flex-shrink: 2;
  }
  @media (min-width: 1280px) and (max-width: 1920px) {
    max-width: 720px;
    min-width: 610px;
    width: 100%;
    flex-shrink: 2;
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
    min-width: 320px;
  }
  & > .swiper-pagination-progressbar-fill {
    --swiper-theme-color: black;
  }
`

export const SwiperSlideWrapper = styled(SwiperSlide)`
  z-index: -999;
  display: flex;
  flex-direction: row;
  width: 80%;
  margin-top: 10px;
`

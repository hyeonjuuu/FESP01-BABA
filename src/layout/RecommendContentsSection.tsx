import styled from 'styled-components'
import useThemeStore from '../store/useThemeStore'
import { useEffect, useState } from 'react'
import getPopularData from '@/api/getPopularData'
import defaultImage from '@/assets/defaultImage.webp'
import { Link } from 'react-router-dom'

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
    console.log(target)
  }

  const { $darkMode } = useThemeStore()

  return (
    <SectionWrapper>
      <SectionHeader width="32px" $darkMode={$darkMode}>
        추천
      </SectionHeader>
      <RecommendSectionWrapper>
        {populardata?.results.map(item => (
          <RecommendSection key={item.id}>
            <Link to="/detail">
              <RecommendImage
                src={`https://image.tmdb.org/t/p/w220_and_h330_face${item.poster_path}`}
                alt={`${item.title} 포스터`}
                onMouseOver={handleMouseHoverImage}
              />
            </Link>
          </RecommendSection>
        ))}
      </RecommendSectionWrapper>
    </SectionWrapper>
  )
}

export default RecommendContentsSection

const SectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
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
const RecommendSectionWrapper = styled.ul`
  display: flex;
  justify-content: center;
  margin: 0;
`

const RecommendSection = styled.li`
  margin: 0;
  display: flex;
  justify-content: flex-start;
  margin-top: 14px;
  margin-bottom: 22px;
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
  }
`

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 391px) {
    display: none;
  }
`

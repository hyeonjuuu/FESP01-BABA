import styled from 'styled-components'
import FeedComponent from '@/components/FeedComponent'
import CategoryComponent from '@/components/CategoryComponent'
import RecommendContentsSection from '@/layout/RecommendContentsSection'
import { useEffect, useState } from 'react'
import { useGenresStore } from '@/store/useGenresStore'
import { getGenreReviewData, getReviewData } from '@/api/getReviewData'

function Main() {
  const [, setWindowWidth] = useState(window.innerWidth)
  const { movieGenresState } = useGenresStore()
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
    const loadReviewData = async () => {
      try {
        let reviewData: ReviewData[] = []
        if (movieGenresStateId) {
          const genreReviewData = await getGenreReviewData(movieGenresStateId)
          console.log('genreReviewData', genreReviewData)

          if (!genreReviewData) {
            throw new Error('해당 카테고리의 리뷰가 없습니다.')
          }

          reviewData = genreReviewData
        } else {
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
    loadReviewData()
  }, [movieGenresState])

  return (
    <>
      <MainPageTitle aria-label="메인페이지">메인 페이지</MainPageTitle>
      <Wrapper>
        <CategoryComponent />
        {window.innerWidth < 1030 ? <RecommendContentsSection /> : ''}
        {movieGenresStateId ? (
          <FeedComponent reviews={reviews} />
        ) : (
          <div>안녕방구</div>
        )}
      </Wrapper>
    </>
  )
}

export default Main

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
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

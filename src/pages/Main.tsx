import styled from 'styled-components'
import FeedComponent from '@/components/FeedComponent'
import CategoryComponent from './../components/CategoryComponent'
import RecommendContentsSection from '@/layout/RecommendContentsSection'

function Main() {
  return (
    <>
      <MainPageTitle aria-label="메인페이지">메인 페이지</MainPageTitle>
      <CategoryComponent />
      <RecommendContentsSection />
      <FeedComponent />
      <FeedComponent />
    </>
  )
}

export default Main

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

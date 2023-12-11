import styled from 'styled-components'
import useThemeStore from '../store/useThemeStore'
import defaultImage from '@/assets/defaultImage.webp'

interface SectionHeaderWidth {
  width?: string
  $darkMode: boolean
}

function RecommendContentsSection() {
  const { $darkMode } = useThemeStore()

  return (
    <section>
      <SectionHeader width="32px" $darkMode={$darkMode}>
        추천
      </SectionHeader>
      <RecommendSectionWrapper>
        <RecommendImage src={defaultImage} alt="" />
        <RecommendImage src={defaultImage} alt="" />
        <RecommendImage src={defaultImage} alt="" />
        <RecommendImage src={defaultImage} alt="" />
        <RecommendImage src={defaultImage} alt="" />
      </RecommendSectionWrapper>
    </section>
  )
}

export default RecommendContentsSection

const SectionHeader = styled.h2<SectionHeaderWidth>`
  font-size: 16px;
  margin: 0;
  padding: 0;
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

const RecommendSectionWrapper = styled.div`
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
`

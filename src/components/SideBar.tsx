import defaultImage from '@/assets/defaultImage.webp'
import styled from 'styled-components'

function SideBar() {
  const test = [1, 2, 3, 4, 5]

  return (
    <SideBarWrapper>
      {test.map(index => (
        <SideContentWrapper key={index} href="">
          <RecommendImage src={defaultImage} alt="" />
          <span>엘리멘탈</span>
        </SideContentWrapper>
      ))}
    </SideBarWrapper>
  )
}

export default SideBar

const SideBarWrapper = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 330px;
  padding: 5px;
`

const SideContentWrapper = styled.a`
  display: flex;
  width: 100%;
  gap: 8px;
  align-items: center;
`
const RecommendImage = styled.img`
  width: 66px;
  height: 94px;
`

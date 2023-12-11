import styled from 'styled-components'
import star from '@/assets/StarIcon.svg'
import like from '@/assets/HeartIcon.svg'
import { FontProps } from './CategoryComponent'

interface PaddingProps {
  $padding?: string
}

function FeedComponent() {
  return (
    <FeedSection>
      <FeedContent>
        <ContentWrapper>
          <CommonDivWrapper $padding="10px">
            <UserImage src="" alt="" />
            <TextColor>UserName</TextColor>
          </CommonDivWrapper>
          <FeedImage src="" alt="" />
          <ContentTitleWrapper>
            <ContentTitle>미션 임파서블</ContentTitle>
            <CommonDivWrapper>
              <StarIcon />
              <span>4.5점</span>
              <LikeIcon />
            </CommonDivWrapper>
          </ContentTitleWrapper>
          <ContentText>
            어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구
          </ContentText>

          <Button fontSize="12px" fontWeight="300">
            더보기
          </Button>
          <Button>댓글보기</Button>
        </ContentWrapper>
      </FeedContent>
    </FeedSection>
  )
}

export default FeedComponent

const FeedSection = styled.section`
  display: flex;
  flex-flow: column;
  margin-top: 26px;
`

const StarIcon = styled.button`
  width: 22px;
  height: 22px;
  background-image: url(${star});
  background-repeat: no-repeat;
`
const LikeIcon = styled(StarIcon)`
  background-image: url(${like});
`
const CommonDivWrapper = styled.div<PaddingProps>`
  display: flex;
  align-items: center;
  gap: 8px;
  align-self: flex-start;
  padding-bottom: ${({ $padding }) => $padding};
  margin: auto 0 auto 0;
`

const UserImage = styled.img`
  height: 36px;
  width: 36px;
  border-radius: 50%;
  border: 1px solid black;
`
const TextColor = styled.span`
  color: #444444;
`
const FeedImage = styled.img`
  height: 310px;
  border: 1px solid black;
  display: block;
`
const FeedContent = styled.div`
  display: flex;
  flex-flow: column;
  gap: 4px;
  display: flex;
  align-items: center;
`
const ContentWrapper = styled.div`
  width: 19.375rem;
`

const ContentTitle = styled.span`
  font-weight: bold;
  font-size: 20px;
  color: #303032;
`
const ContentText = styled.p`
  text-align: left;
  color: #444444;
  margin: 0;
`
const ContentTitleWrapper = styled(CommonDivWrapper)`
  justify-content: space-between;
  margin-top: 6px;
  margin-bottom: 8px;
  align-items: center;
  align-self: center;
  align-content: center;
`
const Button = styled.button<FontProps>`
  box-sizing: border-box;
  border: none;
  outline: none;
  background-color: inherit;
  cursor: pointer;
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  color: #777777;
  align-self: flex-start;
  display: flex;
  padding: 0;
  margin-top: 12px;
`

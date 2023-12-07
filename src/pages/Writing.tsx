import { useState } from 'react'
import styled from 'styled-components'
import ottIcons from '@/utils/ottIconImage'

function Writing() {
  const [text, setText] = useState('')

  const handleFocus = () => {
    if (text === 'Enter your text here...') {
      setText('')
    }
  }

  const handleBlur = () => {
    if (text === '') {
      setText('Enter your text here...')
    }
  }

  return (
    <>
      <Container>
        {ottIcons.map((icon, index) => (
          <OttWrapper key={index}>
            <input type="checkbox" />
            <IconBox>
              <OttIcon src={icon} alt={`OttIcon${index}`} />
            </IconBox>
          </OttWrapper>
        ))}
      </Container>
      <ImgSelectBtn color="#3797EF" hasBorder>
        기본 이미지
      </ImgSelectBtn>
      <ImgSelectBtn>사용자 이미지</ImgSelectBtn>
      <OriginalImage></OriginalImage>
      {/* 사용자의 이미지 영역 추가 */}
      <FeedText
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="이 컨텐츠에 대한 생각을 자유롭게 공유해보세요. 🎬✨"
      ></FeedText>
      {/* 공통컴포넌트 버튼 오면됨 */}
    </>
  )
}

export default Writing

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  max-width: 390px;
  overflow-y: scroll;
  border-top: 2px solid #303032;
`

const OttWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 8px;
`

const IconBox = styled.div`
  width: 28px;
  height: 28px;
`

const OttIcon = styled.img`
  width: 100%;
  height: 100%;
`

const ImgSelectBtn = styled.button<{ hasBorder?: boolean; color?: string }>`
  width: 195px;
  height: 44px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: ${props => props.color || 'white'};
  ${props =>
    props.hasBorder &&
    `
      border: 1px solid black;
    `}
`

const OriginalImage = styled.div`
  width: 390px;
  height: 390px;
  background-color: #d9d9d9;
`

const FeedText = styled.textarea`
  width: 390px;
  height: 200px;
  border: none;
`

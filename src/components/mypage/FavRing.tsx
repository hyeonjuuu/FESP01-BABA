import styled from 'styled-components'

function FavRing() {
  return (
    <Contain>
      <Wrapper>
        <StoryRing>
          <Img></Img>
        </StoryRing>
      </Wrapper>

      <Title>Text hereher</Title>
    </Contain>
  )
}

export default FavRing

const Contain = styled.div`
  width: 60px;
  height: 78px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 0;
`

const Wrapper = styled.div`
  /* display: flex; */
`

const StoryRing = styled.div`
  position: relative;
  width: 72px;
  height: 72px;
  border: 3px solid transparent;
  border-radius: 50%;
  background-image: linear-gradient(#fff, #fff),
    linear-gradient(to right, red 0%, orange 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Img = styled.div`
  background-color: teal;
  width: 64px;
  height: 64px;
  border-radius: 50%;
`

const Title = styled.p`
  font-size: 12px;
  /* line-height: 14px; */
  text-align: center;
`

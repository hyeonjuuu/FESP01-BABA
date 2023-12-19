import styled from 'styled-components'

interface CastInfoProps {
  profile: string
  name: string
  character: string
}

function CastInfo({ profile, name, character }: CastInfoProps) {
  return (
    <Container>
      <ImgWrapper>
        <Img
          src={`https://image.tmdb.org/t/p/original/${profile}`}
          alt={name}
        />
      </ImgWrapper>
      <Wrapper>
        <span>{name}</span>
        <span>{character}</span>
      </Wrapper>
    </Container>
  )
}

export default CastInfo

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
`

const ImgWrapper = styled.div`
  width: 70px;
  height: 70px;
`

const Img = styled.img`
  width: 70px; /* 조절 가능한 크기 */
  height: 70px; /* 조절 가능한 크기 */
  border-radius: 50%; /* width와 height를 반으로 나눈 값으로 설정 */
  object-fit: cover;
`

import styled, { ThemeProvider } from 'styled-components'
import defaultImage from '@/assets/defaultImage.webp'
import useThemeStore from '@/store/useThemeStore'
import { Link } from 'react-router-dom'

function SideBar() {
  const test = [1, 2, 3, 4, 5]
  const { $darkMode } = useThemeStore()
  return (
    <ThemeProvider
      theme={{
        bgColor: $darkMode ? '#1E1E1E' : '#FFF',
        color: $darkMode ? '#fff' : '#1E1E1E'
      }}
    >
      <SideBarWrapper>
        <Title>🍿 오늘의 추천 영화 🎬</Title>
        {test.map(index => (
          <SideContentWrapper key={index} to="/detail">
            <ContentNumber>{index}</ContentNumber>
            <RecommendImage src={defaultImage} alt="" />
            <Movie>
              <MovieTitle>엘리멘탈</MovieTitle>
              <MovieInfo>
                <List>
                  <Span>장르</Span>
                  <P>로맨스</P>
                </List>
              </MovieInfo>
            </Movie>
          </SideContentWrapper>
        ))}
      </SideBarWrapper>
    </ThemeProvider>
  )
}

export default SideBar

const SideBarWrapper = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;

  gap: 4px;
  width: 350px;
  padding: 5px;

  @media (max-width: 1030px) {
    display: none;
  }
`

const SideContentWrapper = styled(Link)`
  width: 100%;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  gap: 20px;
  text-decoration: none;
  color: black;
`

const ContentNumber = styled.span`
  width: 14px;
  color: ${props => props.theme.color};
`

const Title = styled.h5`
  font-size: 22px;
`

const RecommendImage = styled.img`
  width: 75px;
  height: 94px;
`

const Movie = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const MovieTitle = styled.div`
  color: ${props => props.theme.color};
`

const MovieInfo = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
`

const List = styled.li`
  list-style-type: none;
  display: flex;
`

const Span = styled.span`
  margin-right: 8px;
  color: ${props => props.theme.color};
`

const P = styled.p`
  margin: 0;
  color: ${props => props.theme.color};
`

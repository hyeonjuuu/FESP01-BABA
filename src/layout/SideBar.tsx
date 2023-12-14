import styled, { ThemeProvider } from 'styled-components'
import useThemeStore from '@/store/useThemeStore'
import { usePopularDataStore } from '@/store/usePopularDataStore'
import { useEffect } from 'react'
import getPopularData from '@/api/getPopularData'
import { movieGenres } from '@/utils/genresData'
import { Link } from 'react-router-dom'

function SideBar() {
  const { populardata, setPopularData } = usePopularDataStore()
  const { $darkMode } = useThemeStore()

  useEffect(() => {
    const popularDataFetching = async () => {
      const response = await getPopularData()
      setPopularData(response)
    }
    popularDataFetching()
  }, [])
  console.log(populardata)

  return (
    <ThemeProvider
      theme={{
        bgColor: $darkMode ? '#1E1E1E' : '#FFF',
        color: $darkMode ? '#fff' : '#1E1E1E'
      }}
    >
      <SideBarWrapper>
        <Title>🍿 오늘의 추천 영화 🎬</Title>
        {populardata?.results.slice(0, 10).map((item, index) => (
          <SideContentWrapper key={item.id} to={`/movie/${item.id}`}>
            <ContentNumber>{index + 1}</ContentNumber>
            <RecommendImage
              src={`https://image.tmdb.org/t/p/w220_and_h330_face${item.poster_path}`}
              alt={`${item.title} 포스터`}
            />
            <Movie>
              <MovieTitle>{item.title}</MovieTitle>
              <MovieInfo>
                <List>
                  {item.genre_ids
                    .slice(0, 3)
                    .map((id: number, index: number) => {
                      const genre = movieGenres.genres.find(
                        genre => genre.id === id
                      )
                      return <GenreSpan key={index}>{genre?.name}</GenreSpan>
                    })}
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
  aspect-ratio: 2/3;
  object-fit: fill;
  border-radius: 3px;
`

const Movie = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const MovieTitle = styled.div`
  font-weight: 600;
  color: #303032;
  width: 210px;
`

const MovieInfo = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  font-size: 12px;
  margin-top: 6px;
`

const List = styled.li`
  list-style-type: none;
  display: flex;
`

const GenreSpan = styled.span`
  margin: 0;
  color: #777777;
  margin-right: 4px;
`
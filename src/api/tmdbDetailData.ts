import { Crew } from '@/types'
import axios from 'axios'

// 영화의 상세정보를 가져옵니다.
export const getDetailData = async (movieId: string) => {
  try {
    const result = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
        }
      }
    )

    if (result) {
      console.log(result)
      return result
    }
  } catch (error) {
    console.error(error)
  }
}

// 영화의 감독의 정보를 가져옵니다.
export const findMovieDirector = async (
  movieId: string
): Promise<string | undefined> => {
  try {
    const result = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
        }
      }
    )

    if (result.data) {
      const director = result.data.crew.find(
        (data: Crew) => data.job === 'Director'
      )

      return director ? director.name : undefined
    }
  } catch (error) {
    console.error(error)
  }
}

import axios from 'axios'

const getGenreData = async () => {
  try {
    const response = await axios.get(
      'https://api.themoviedb.org/3/genre/movie/list?language=ko',
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.REACT_APP_TMDB_API_KEY}`,
          accept: 'application/json'
        }
      }
    )
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export default getGenreData

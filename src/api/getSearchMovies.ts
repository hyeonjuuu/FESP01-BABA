import axios from 'axios'

const getSearchMovies = async (search: string) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/multi?query=${search}}&include_adult=false&language=ko-KR&page=1`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
          accept: 'application/json'
        }
      }
    )
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export default getSearchMovies

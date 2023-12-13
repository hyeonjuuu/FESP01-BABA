import axios from 'axios'

const getMovieImage = async () => {
  try {
    const response = await axios.get(
      'https://api.themoviedb.org/3/movie/100/images',
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
          accept: 'application/json'
        }
      }
    )
    // console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export default getMovieImage

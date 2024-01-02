import axios from 'axios'

const getTrendingData = async () => {
  try {
    const response = await axios.get(
      'https://api.themoviedb.org/3/trending/all/day?language=ko-KR',
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
          accept: 'application/json'
        }
      }
    )
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export default getTrendingData

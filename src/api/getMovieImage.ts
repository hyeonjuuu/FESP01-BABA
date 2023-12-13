import axios from 'axios'

const getMovieImage = async () => {
  try {
    const response = await axios.get(
      'https://api.themoviedb.org/3/movie/100/images',
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOGI5OTA2MjRiNGQ0YWYwYWY1MTQxM2VjN2NhZGZhYyIsInN1YiI6IjY1NmVhY2I2MDg1OWI0MDBmZjc2ZDg5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rztiGVGc8hGW9JewLp_1rWQqRmocY_2m9QQc31aHWqo',
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

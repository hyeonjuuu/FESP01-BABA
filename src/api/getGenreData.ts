import axios from 'axios'

const getGenreData = async () => {
  try {
    const response = await axios.get(
      'https://api.themoviedb.org/3/genre/movie/list?language=ko',
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjc3OWE4NThlYzIxOWUyYmEyOGU1ZWY4MDBhNGFmMiIsInN1YiI6IjY1NzAwMDVhZDE4ZmI5MDBlM2ZhNWU5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XDCpuR52PAiChL34UMGYBvGtWtOq7NYrjkIVBuMyuRg',
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

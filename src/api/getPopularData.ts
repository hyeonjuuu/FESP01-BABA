import axios from 'axios'

const getPopularData = async () => {
  try {
    const response = await axios.get(
      'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc',
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

export default getPopularData

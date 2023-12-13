interface PopularData {
  results: PopularDataItem[]
}

interface PopularDataItem {
  genre_ids: ReactNode
  vote_average: ReactNode
  poster_path: string
  id: number
  title: string
}

interface MovieGenres {
  genres: {
    id: number
    name: string
  }[]
}

interface SearchListProps {
  id: number
  title: string
  poster_path: string | null
}

interface SearchResultProps {
  id: number
  title: string
  poster_path: string | null
}

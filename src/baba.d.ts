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

interface SearchListProps {
  id: number
  media_type: string
  title?: string
  name?: string
  poster_path: string | null
}

interface SearchResultProps {
  id: number
  media_type: string
  title?: string
  name?: string
  poster_path: string | null
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

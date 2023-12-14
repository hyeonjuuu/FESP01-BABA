interface PopularData {
  results: PopularDataItem[]
}

interface PopularDataItem {
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

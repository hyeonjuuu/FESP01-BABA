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
  title: string
  poster_path: string | null
}

interface SearchResultProps {
  id: number
  title: string
  poster_path: string | null
}

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
  genre_ids?: number[]
  title?: string
  name?: string
  poster_path: string | null
}

interface SearchResultProps {
  id: number
  media_type: string
  genre_ids?: number[]
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

interface ReviewsProps {
  created_at: string
  default_img: string | null
  genre_ids: number[]
  id: number
  img_url: string | null
  likes: string
  movie_id: string
  movie_title: string
  nickname: string
  ott: string[]
  rating: number
  text: string
  updated_at: string | null
  user_id: string
}

interface UserData {
  email: string | undefined
  id: string | undefined
}

interface LikeData {
  created_at: string
  id: number
  img_url: string
  likes: string[]
  movie_id: string
  movie_title: string
  ott: string[]
  rating: number
  text: string
  updated_at: string
  user_id: string
}

interface LikesType {
  user_id: string | null
  review_id: number
}

interface BookmarkStore {
  bookmarkList: string[]
  setBookmarkList: (itemIds: string[]) => void
  deleteBookmarkList: (itemId: string) => void
}

interface MovieProps {
  id: number
  title: string
  poster_path: string
}

import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface LikeItem {
  movie_id: string
  user_id: string
  text: string
  created_at: string
  updated_at: string | null
  // ... other properties
}

interface BookmarkStore {
  bookmarkList: LikeItem[]
  setBookmarkList: (likesData: LikeItem[]) => void
  // ... other methods
}

export const useBookmarkStore = create<BookmarkStore>(set => ({
  bookmarkList: [],
  setBookmarkList: likesData => set({ bookmarkList: likesData })
  // ... other methods
}))

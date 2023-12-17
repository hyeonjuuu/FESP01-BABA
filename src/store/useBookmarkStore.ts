import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface BookmarkStore {
  bookmarkList: string[] // itemId의 배열로 가정합니다. 필요에 따라 수정하세요.
  setBookmarkList: (itemId: string) => void
  deleteBookmarkList: (itemId: string) => void
}

export const useBookmarkStore = create<BookmarkStore>(set => ({
  bookmarkList: [],
  setBookmarkList: (itemId: string) =>
    set(state => ({
      bookmarkList: [...state.bookmarkList, itemId]
    })),
  deleteBookmarkList: (itemId: string) =>
    set(state => ({
      bookmarkList: state.bookmarkList.filter(item => item !== itemId)
    }))
}))

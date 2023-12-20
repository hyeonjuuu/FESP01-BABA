import { create } from 'zustand'

export const useBookmarkStore = create<BookmarkStore>(set => ({
  bookmarkList: [],

  setBookmarkList: (itemIds: string[]) =>
    set(state => ({
      bookmarkList: itemIds
    })),

  deleteBookmarkList: itemId =>
    set(state => ({
      bookmarkList: state.bookmarkList.filter(item => item !== itemId)
    }))
}))

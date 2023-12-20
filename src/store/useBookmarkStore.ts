import { create } from 'zustand'

export const useBookmarkStore = create<BookmarkStore>(set => ({
  bookmarkList: [],

  // setBookmarkList: itemIds =>
  // set(state => ({
  //   // bookmarkList: [...itemIds] // 문자열을 배열로 반환하여 저장
  //   bookmarkList: [...state.bookmarkList, loginUserId]
  // })),

  setBookmarkList: (itemIds: string[]) =>
    set(state => ({
      // bookmarkList: [...state.bookmarkList, ...itemIds]
      bookmarkList: itemIds
    })),

  deleteBookmarkList: itemId =>
    set(state => ({
      // bookmarkList: state.bookmarkList.filter(item => item !== itemId)
      bookmarkList: state.bookmarkList.filter(item => item !== itemId)
    }))
}))

import { create } from 'zustand'

// export const useBookmarkStore = create<BookmarkStore>(set => ({
//   bookmarkList: [],
//   setBookmarkList: (itemId: number) =>
//     set(state => ({
//       bookmarkList: [...state.bookmarkList, itemId]
//     })),
//   deleteBookmarkList: (itemId: number) =>
//     set(state => ({
//       bookmarkList: state.bookmarkList.filter(item => item !== itemId)
//     }))
// }))
// export const useBookmarkStore = create<BookmarkStore>(set => ({
//   bookmarkList: [],
//   setBookmarkList: itemId =>
//     set(state => ({
//       bookmarkList: itemId
//     })),
//   deleteBookmarkList: itemId =>
//     set(state => ({
//       bookmarkList: state.bookmarkList.filter(item => item !== itemId)
//     }))
// }))
export const useBookmarkStore = create<BookmarkStore>(set => ({
  bookmarkList: [],

  setBookmarkList: itemIds =>
    set(state => ({
      bookmarkList: itemIds
    })),

  deleteBookmarkList: itemId =>
    set(state => ({
      bookmarkList: state.bookmarkList.filter(item => item !== itemId)
    }))
}))

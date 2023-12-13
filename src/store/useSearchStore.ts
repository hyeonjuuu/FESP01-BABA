import { create } from 'zustand'

interface SearchResultProps {
  id: number
  title: string
  poster_path: string
}

interface SearchStore {
  searchList: SearchResultProps[]
  setSearchList: (searchResults: SearchResultProps[]) => void
}

const useSearchStore = create<SearchStore>(set => ({
  searchList: [],
  setSearchList: searchResults => set({ searchList: searchResults })
}))

export default useSearchStore

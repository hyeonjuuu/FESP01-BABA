import { create } from 'zustand'

interface GenreDataState {
  movieGenresState: {
    id: number
    name: string
  }[]
  setMovieGenresState: (data: { id: number; name: string }[]) => void
}

export const useGenresStore = create<GenreDataState>(set => ({
  movieGenresState: [],
  setMovieGenresState: data => set({ movieGenresState: data })
}))

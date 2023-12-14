import { create } from 'zustand'

interface GenreDataState {
  movieGenres: MovieGenres | null
  setMovieGenres: (data: MovieGenres) => void
}

export const useGenresStore = create<GenreDataState>(set => ({
  movieGenres: null,
  setMovieGenres: (response: MovieGenres) => set({ movieGenres: response })
}))

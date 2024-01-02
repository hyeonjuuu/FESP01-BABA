import create from 'zustand'

interface TrendDataState {
  trendData: Array<{
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    media_type: string
    name: string
    title: string
    origin_country: string[]
    original_language: string
    original_name: string
    overview: string
    popularity: number
    poster_path: string
    vote_average: number
    vote_count: number
  }>
  reverseTrendData: Array<{
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    media_type: string
    name: string
    title: string
    origin_country: string[]
    original_language: string
    original_name: string
    overview: string
    popularity: number
    poster_path: string
    vote_average: number
    vote_count: number
  }>

  setTrendData: (
    data: Array<{
      adult: boolean
      backdrop_path: string
      genre_ids: number[]
      id: number
      media_type: string
      name: string
      title: string
      origin_country: string[]
      original_language: string
      original_name: string
      overview: string
      popularity: number
      poster_path: string
      vote_average: number
      vote_count: number
    }>
  ) => void
  setReverseData: (
    data: Array<{
      adult: boolean
      backdrop_path: string
      genre_ids: number[]
      id: number
      media_type: string
      name: string
      title: string
      origin_country: string[]
      original_language: string
      original_name: string
      overview: string
      popularity: number
      poster_path: string
      vote_average: number
      vote_count: number
    }>
  ) => void
}

export const useTrendDataStore = create<TrendDataState>(set => ({
  trendData: [],
  reverseTrendData: [],
  setTrendData: data => set({ trendData: data }),
  setReverseData: dataReverse =>
    set({ reverseTrendData: dataReverse.reverse() })
}))

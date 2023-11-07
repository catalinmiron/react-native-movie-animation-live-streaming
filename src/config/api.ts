import { Axios } from 'axios'
import { GenreIds } from './movies'

export const apiClient = new Axios({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_TMDB_API_KEY',
  },
})

// discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc

export type MovieItem = {
  adult: boolean
  backdrop_path: string
  genre_ids: GenreIds[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export type DiscoverMoviesPayload = {
  page: number
  results: MovieItem[]
  total_pages: number
  total_results: number
}

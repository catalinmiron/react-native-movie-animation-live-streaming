// we need filters for
// Genre, Year + Page + QueryKey

import { Observable, computed, observable } from '@legendapp/state'
import { genres } from '../config/movies'

export const moviesParams$ = observable({
  page: 1,
  year: 2023,
  genre: genres[0].id,
  queryKey: computed((): Observable<string[]> => {
    const { year, genre, page } = moviesParams$.get()
    // @ts-ignore
    return [`year-${year}`, `genre-${genre}`, `page-${page}`]
  }),
})

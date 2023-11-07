import { useObservableQuery } from '@legendapp/state/react-hooks/useObservableQuery'
import { FlatList, View, useWindowDimensions } from 'react-native'
import { DiscoverMoviesPayload, apiClient } from '../config/api'
import { pagination$ } from '../state/carousel'
import { moviesParams$ } from '../state/movies'
import { MovieItem } from './MovieItem'
import { MovieItemDetails } from './MovieItemDetails'
import { Pagination } from './Pagination'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export default function MovieList() {
  const queryKey = moviesParams$.queryKey.get()
  const query$ = useObservableQuery({
    keepPreviousData: true,
    queryKey,
    queryFn: async () => {
      const { genre, year, page } = moviesParams$.peek()
      console.log({ genre, year, page })

      await wait(1000)
      return apiClient
        .get<DiscoverMoviesPayload>('/discover/movie', {
          params: {
            page,
            with_genres: genre,
            year,
            include_adult: false,
            include_video: false,
            language: 'en-US',
            sort_by: 'popularity.desc',
          },
        })
        .then((res) => JSON.parse(String(res.data)) as DiscoverMoviesPayload)
        .then((data) => {
          pagination$.assign({
            total: data.results.length,
          })
          return data.results
        })
    },
  })

  const { data, isLoading, isFetching } = query$.get()
  const current = pagination$.current.get()
  const { width, height } = useWindowDimensions()

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        horizontal
        pagingEnabled
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => {
          return <MovieItem item={item} />
        }}
        onMomentumScrollEnd={(e) => {
          pagination$.assign({
            current: Math.floor(
              e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width
            ),
          })
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          padding: 24,
          width: '100%',
          gap: 32,
          paddingBottom: height * 0.15,
          height: height * 0.3,
        }}
      >
        <Pagination style={{ alignSelf: 'flex-end' }} />
        {data && <MovieItemDetails item={data[current]} />}
      </View>
    </View>
  )
}

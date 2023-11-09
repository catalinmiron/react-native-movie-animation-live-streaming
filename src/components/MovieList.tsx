import { useObservableQuery } from '@legendapp/state/react-hooks/useObservableQuery'
import { useRef } from 'react'
import { FlatList, View, useWindowDimensions } from 'react-native'
import { Directions, Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { DiscoverMoviesPayload, apiClient } from '../config/api'
import { pagination$ } from '../state/carousel'
import { filterLayout$ } from '../state/filters'
import { moviesParams$ } from '../state/movies'
import { MovieFilters } from './MovieFilters'
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

      // await wait(1000)
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
          flatListRef.current?.scrollToOffset({
            offset: 0,
            animated: false,
          })
          pagination$.assign({
            current: 0,
            total: data.results.length,
          })
          return data.results
        })
    },
  })

  const { data, isLoading, isFetching } = query$.get()
  const current = pagination$.current.get()
  const { width, height } = useWindowDimensions()
  const flatListRef = useRef<FlatList>(null)
  const filtersHeight = filterLayout$.height.get()
  const filterAnimation = useSharedValue(0)
  const moviesListStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: filterAnimation.value,
        },
      ],
      borderRadius: interpolate(filterAnimation.value, [0, filtersHeight], [0, 24]),
    }
  })

  // Fling up -> close the filters
  // Fling down -> open the filter
  // Pressing outside -> close the filters
  const flingDown = Gesture.Fling()
    .direction(Directions.DOWN)
    .onStart(() => {
      filterAnimation.value = withTiming(filtersHeight)
    })
  const flingUp = Gesture.Fling()
    .direction(Directions.UP)
    .onStart(() => {
      filterAnimation.value = withTiming(0)
    })

  const tap = Gesture.Tap().onStart(() => {
    filterAnimation.value = withTiming(0)
  })

  return (
    <View style={{ flex: 1 }}>
      <MovieFilters />
      <GestureDetector gesture={Gesture.Race(flingDown, flingUp, tap)}>
        <Animated.View style={[moviesListStyle, { overflow: 'hidden', backgroundColor: '#000' }]}>
          <FlatList
            ref={flatListRef}
            data={data}
            horizontal
            pagingEnabled
            bounces={false}
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
          {data && (
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
              pointerEvents="box-none"
            >
              <Pagination style={{ alignSelf: 'flex-end' }} />
              <MovieItemDetails item={data[current]} />
            </View>
          )}
        </Animated.View>
      </GestureDetector>
    </View>
  )
}

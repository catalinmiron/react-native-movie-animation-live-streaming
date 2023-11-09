import { Button, SafeAreaView, ScrollView, Text, View } from 'react-native'
import { genres } from '../config/movies'
import { filterLayout$ } from '../state/filters'
import { moviesParams$ } from '../state/movies'

const _spacing = 12

export function MovieFilters() {
  return (
    <SafeAreaView style={{ backgroundColor: '#fff', position: 'absolute' }}>
      <View
        style={{ padding: _spacing }}
        onLayout={(e) => {
          const { y, height } = e.nativeEvent.layout
          const containerHeight = y + height
          filterLayout$.assign({
            height: containerHeight,
          })
        }}
      >
        <Text>Year</Text>
        <ScrollView horizontal>
          {[...Array(10).keys()].map((index) => {
            const year = 2023 - index
            return (
              <Button
                key={`year-${year}`}
                onPress={() => {
                  moviesParams$.assign({
                    year: year,
                  })
                }}
                title={String(year)}
              />
            )
          })}
        </ScrollView>
        <Text>Genre</Text>
        <ScrollView horizontal>
          {genres.map((genre) => {
            return (
              <Button
                key={`year-${genre.id}`}
                onPress={() => {
                  moviesParams$.assign({
                    genre: genre.id,
                  })
                }}
                title={genre.name}
              />
            )
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

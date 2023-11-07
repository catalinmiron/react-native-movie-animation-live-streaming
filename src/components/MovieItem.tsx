// import { Image } from 'expo-image'
import { Image, StyleSheet, View, useWindowDimensions } from 'react-native'
import type { MovieItem } from '../config/api'
import { getImagePath } from '../config/movies'

export function MovieItem({ item }: { item: MovieItem }) {
  const { width, height } = useWindowDimensions()
  return (
    <View
      style={{
        width,
        height,
        backgroundColor: '#000',
        justifyContent: 'flex-end',
      }}
    >
      <Image
        source={{
          uri: getImagePath(item.backdrop_path),
        }}
        // contentFit="cover"
        resizeMode="cover"
        style={[
          StyleSheet.absoluteFillObject,
          {
            opacity: 0.5,
          },
        ]}
      />
    </View>
  )
}

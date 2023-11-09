import { Image } from 'expo-image'
import { StyleSheet, View, useWindowDimensions } from 'react-native'
import type { MovieItem } from '../config/api'
import { getImagePath } from '../config/movies'

export function MovieItem({ item }: { item: MovieItem }) {
  const { width, height } = useWindowDimensions()
  return (
    <View
      style={{
        width,
        height,
        justifyContent: 'flex-end',
      }}
    >
      <Image
        key={item.id}
        source={{
          uri: getImagePath(item.backdrop_path),
        }}
        contentFit="cover"
        transition={400}
        style={[StyleSheet.absoluteFillObject]}
      />
      <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,0.5)' }]} />
    </View>
  )
}

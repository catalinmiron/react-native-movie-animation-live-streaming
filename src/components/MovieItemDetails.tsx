// import { Image } from 'expo-image'
import { AntDesign, Entypo } from '@expo/vector-icons'
import { StyleSheet, Text, View } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import type { MovieItem } from '../config/api'
import { genresById } from '../config/movies'

export function MovieItemDetails({ item }: { item: MovieItem }) {
  return (
    <Animated.View
      key={`details-${item.id}`}
      entering={FadeIn}
      exiting={FadeOut}
      style={{ maxWidth: '80%' }}
    >
      <Text style={styles.text}>
        {item.genre_ids.map((genreId) => genresById[genreId]).join(', ')}
      </Text>
      <Text style={styles.title}>{item.title}</Text>
      <View style={{ flexDirection: 'row', columnGap: 8, alignItems: 'center' }}>
        <Text style={styles.text}>{new Date(item.release_date).getFullYear()}</Text>
        <Entypo name="dot-single" size={14} color={'white'} />
        <View style={{ flexDirection: 'row', columnGap: 2, alignItems: 'center' }}>
          <AntDesign name="star" size={8} color="white" />
          <Text style={styles.text}>{item.vote_average}</Text>
        </View>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  title: {
    marginTop: 8,
    marginBottom: 4,
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
  },
  text: {
    fontSize: 12,
    color: 'white',
  },
})

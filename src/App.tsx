import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StyleSheet, View } from 'react-native'
import MovieList from './components/MovieList'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <MovieList />
      </View>
    </QueryClientProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
})

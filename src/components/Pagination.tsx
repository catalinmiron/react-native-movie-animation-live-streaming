import { Entypo } from '@expo/vector-icons'
import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated'
import { pagination$ } from '../state/carousel'

export function Pagination({ style }: { style: ViewStyle }) {
  const total = pagination$.total.get()
  const current = pagination$.current.get()
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
        },
        style,
      ]}
    >
      <Animated.Text
        style={[styles.text, styles.currentText]}
        key={`current-${current}`}
        entering={FadeInUp}
        exiting={FadeOutDown}
      >
        {current > 9 ? current : `0${current}`}
      </Animated.Text>
      <Entypo name="dot-single" size={14} color="white" style={{ opacity: 0.6 }} />
      <Text style={styles.text}>{total}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: 'rgba(255,255,255,1)',
    fontVariant: ['tabular-nums'],
  },
  currentText: {
    fontWeight: '800',
  },
})

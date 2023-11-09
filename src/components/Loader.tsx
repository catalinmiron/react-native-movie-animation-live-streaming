import { MotiView } from 'moti'
import { ViewStyle } from 'react-native'

export function Loader({
  size = 64,
  color = '#000',
  style,
}: {
  size?: number
  style?: ViewStyle
  color?: string
}) {
  return (
    <MotiView
      style={[
        style,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          position: 'absolute',
          borderWidth: size * 0.1,
          alignSelf: 'center',
          borderColor: color,
          borderTopColor: 'transparent',
        },
      ]}
      from={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        rotate: ['0deg', `${360 * 4}deg`],
      }}
      transition={{
        type: 'timing',
        rotate: {
          delay: 200,
          duration: 1000,
          loop: true,
        },
      }}
      exit={{
        opacity: 0,
      }}
    />
  )
}

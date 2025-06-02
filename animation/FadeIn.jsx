import React, { useEffect, useRef } from 'react'
import { Animated, Dimensions } from 'react-native'

const FadeIn = ({ children }) => {
  const positionLeft = useRef(
    new Animated.Value(Dimensions.get('window').width),
  ).current

  useEffect(() => {
    Animated.spring(positionLeft, {
      toValue: 0,
      useNativeDriver: true,
    }).start()
  }, [])

  return (
    <Animated.View
      style={{
        transform: [{ translateX: positionLeft }],
      }}
    >
      {children}
    </Animated.View>
  )
}

export default FadeIn

import React, { useEffect, useRef } from 'react'
import { Animated } from 'react-native'

const EnlargeShrink = ({ shouldEnlarge, children }) => {
  const viewSize = useRef(new Animated.Value(shouldEnlarge ? 80 : 40)).current

  useEffect(() => {
    Animated.spring(viewSize, {
      toValue: shouldEnlarge ? 80 : 40,
      useNativeDriver: false,
    }).start()
  }, [shouldEnlarge])

  return (
    <Animated.View style={{ width: viewSize, height: viewSize }}>
      {children}
    </Animated.View>
  )
}

export default EnlargeShrink

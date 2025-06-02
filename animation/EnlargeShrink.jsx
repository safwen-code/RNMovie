import React, { useEffect, useRef } from 'react'
import { Animated } from 'react-native'

const EnlargeShrink = ({ shouldEnlarge, children }) => {
  const viewSize = useRef(new Animated.Value(getSize(shouldEnlarge))).current

  const getSize = (shouldEnlarge) => {
    return shouldEnlarge ? 80 : 40
  }

  useEffect(() => {
    Animated.spring(viewSize, {
      toValue: getSize(shouldEnlarge),
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

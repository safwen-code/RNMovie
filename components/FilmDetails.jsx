import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const FilmDetails = ({ route }) => {
  console.log('id film from filmdetail', route.params)
  const { idfilm } = route.params || {}

  return (
    <View style={styles.main_container}>
      <Text>Film Details</Text>
      <Text>Film ID: {idfilm}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
})
export default FilmDetails

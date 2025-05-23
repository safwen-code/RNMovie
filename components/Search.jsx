import React from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  FlatList,
  Text,
} from 'react-native'
import films from '../Helpers/filmsData.js'
const Search = () => {
  return (
    <View style={styles.main_container}>
      <TextInput style={styles.textinput} placeholder="Titre du film" />
      <Button
        title="Search Movie"
        onPress={() => {
          console.log('search')
        }}
      />
      <FlatList
        data={films}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginTop: 20,
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5,
    marginTop: 70,
    marginBottom: 20,
  },
})

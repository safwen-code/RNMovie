import React, { useState } from 'react'
import { StyleSheet, View, TextInput, Button, FlatList } from 'react-native'
// import films from '../Helpers/filmsData.js'
import FilmsItems from './FilmsItems.jsx'
import { getfilmbytext } from '../Helpers/MVapi.js'
import Spinner from './Spinner.jsx'

const Search = () => {
  const [search, setSearch] = useState()
  const [films, setFilms] = useState([])
  const [loading, setLoading] = useState(true)

  const searchHundler = (text) => {
    setSearch(text)
  }

  const sreachCklick = () => {
    if (search) {
      getfilmbytext(search)
        .then((data) => {
          // console.log(data.results)
          setFilms(data.results)
          setLoading(false)
        })
        .catch((error) => console.error(error))
    }
  }

  return (
    <View style={styles.main_container}>
      <TextInput
        style={styles.textinput}
        placeholder="Titre du film"
        onChangeText={searchHundler}
        value={search}
        name="search"
      />
      <Button title="Search Movie" onPress={sreachCklick} />
      <FlatList
        data={films}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <FilmsItems film={item} />}
      />
      {loading && <Spinner />}
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

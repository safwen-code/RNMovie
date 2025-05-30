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
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const searchHundler = (text) => {
    setSearch(text)
  }

  const loadFilms = () => {
    getfilmbytext(search, page + 1)
      .then((data) => {
        // console.log(data.results)
        setPage(data.page)
        setTotalPages(data.total_pages)
        setFilms(data.results)
        setLoading(false)
      })
      .catch((error) => console.error(error))
  }
  const sreachCklick = () => {
    if (search) {
      setLoading(true)
      loadFilms()
    }
  }

  const submitInput = () => {
    setPage(0)
    setTotalPages(0)
    setFilms({ films: [] }, () => {
      loadFilms()
    })
  }
  return (
    <View style={styles.main_container}>
      <TextInput
        style={styles.textinput}
        placeholder="Titre du film"
        onChangeText={searchHundler}
        value={search}
        name="search"
        onSubmitEditing={submitInput}
      />
      <Button title="Search Movie" onPress={sreachCklick} />
      <FlatList
        data={films}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <FilmsItems film={item} />}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (page < totalPages) {
            loadFilms()
          }
        }}
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

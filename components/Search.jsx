import React, { useState } from 'react'
import { StyleSheet, View, TextInput, Button, SafeAreaView } from 'react-native'

import { getfilmbytext } from '../Helpers/MVapi.js'
import Spinner from './Spinner.jsx'
import FilmList from './FilmList.jsx'

const Search = () => {
  const [search, setSearch] = useState()
  const [films, setFilms] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  //get text == search
  const searchHundler = (text) => {
    setSearch(text)
  }

  //hundel films from dbMovie
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

  //search for data
  const sreachCklick = () => {
    if (search) {
      setLoading(true)
      loadFilms()
    }
  }
  //submit by input
  const submitInput = () => {
    setPage(0)
    setTotalPages(0)
    setFilms({ films: [] }, () => {
      loadFilms()
    })
  }

  return (
    <SafeAreaView style={styles.main_container}>
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
        <FilmList
          films={films}
          page={page}
          totalPages={totalPages}
          favoriteList={false}
          loadFilms={loadFilms}
        />
        {loading && <Spinner />}
      </View>
    </SafeAreaView>
  )
}

export default Search

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
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

import React, { useState } from 'react'
import { StyleSheet, View, TextInput, Button, FlatList } from 'react-native'
// import films from '../Helpers/filmsData.js'
import FilmsItems from './FilmsItems.jsx'
import { getfilmbytext } from '../Helpers/MVapi.js'
import Spinner from './Spinner.jsx'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

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

  const navigation = useNavigation()
  //get id of film
  const getFilmId = (id) => {
    // console.log('search comp id film', id)
    navigation.navigate('FilmDetails', { idfilm: id })
  }

  const favorite = useSelector((state) => state.favorite)
  const { favoritesFilm } = favorite

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
        renderItem={({ item }) => (
          <FilmsItems
            film={item}
            getFilmId={getFilmId}
            isFilmFavorite={
              favoritesFilm.findIndex((film) => film.id === item.id) !== -1
                ? true
                : false
            }
          />
        )}
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

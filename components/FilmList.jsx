import React from 'react'
import { FlatList } from 'react-native'
import FilmsItems from './FilmsItems'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

const FilmList = ({ films, favoriteList, page, totalPages, loadFilms }) => {
  const favorite = useSelector((state) => state.favorite)
  const { favoritesFilm } = favorite

  const navigation = useNavigation()
  //get id of film
  const getFilmId = (id) => {
    // console.log('search comp id film', id)
    navigation.navigate('FilmDetails', { idfilm: id })
  }
  return (
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
        if (!favoriteList && page < totalPages) {
          loadFilms()
        }
      }}
    />
  )
}

export default FilmList

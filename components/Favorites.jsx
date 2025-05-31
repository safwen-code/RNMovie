import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { useSelector } from 'react-redux'
import FilmList from './FilmList'

const Favorites = ({ favoriteList }) => {
  const favorite = useSelector((state) => state.favorite)
  const { favoritesFilm } = favorite

  // console.log(favoritesFilm)
  return <FilmList films={favoritesFilm} favoriteList={true} />
}

const styles = StyleSheet.create({})
export default Favorites

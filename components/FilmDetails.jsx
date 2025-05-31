import { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native'
import Spinner from './Spinner'
import { getfilmbyid } from '../Helpers/MVapi'
import { useSelector, useDispatch } from 'react-redux'

import moment from 'moment/moment'
import numeral from 'numeral'

const FilmDetails = ({ route }) => {
  const favorite = useSelector((state) => state.favorite)
  const { favoritesFilm } = favorite

  const { idfilm } = route.params || {}
  const [film, setFilm] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getfilmbyid(idfilm).then((data) => {
      //   console.log(data)
      setFilm(data)
      setLoading(false)
    })
  }, [getfilmbyid, idfilm])

  const dispatch = useDispatch()
  const handleToggleFavorite = () => {
    dispatch({ type: 'TOGGLE_FAVORITE', value: film })
  }

  const displayFavoriteImage = () => {
    var sourceImage = require('../Images/favorie.png')
    if (favoritesFilm.findIndex((item) => item.id === film.id) !== -1) {
      // Film dans nos favoris
      sourceImage = require('../Images/favorite.png')
    }
    return <Image style={styles.favorite_image} source={sourceImage} />
  }
  return (
    <View style={styles.main_container}>
      {loading ? (
        <Spinner />
      ) : (
        <ScrollView style={styles.scrollview_container}>
          <Image
            style={styles.image}
            source={{
              uri: `https://image.tmdb.org/t/p/w500${film.poster_path}`,
            }}
          />
          <Text style={styles.title_text}>{film.title}</Text>
          <TouchableOpacity
            style={styles.favorite_container}
            onPress={handleToggleFavorite}
          >
            {displayFavoriteImage()}
          </TouchableOpacity>
          <Text style={styles.description_text}>{film.overview}</Text>
          <Text style={styles.default_text}>
            Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}
          </Text>
          <Text style={styles.default_text}>
            Note : {film.vote_average} / 10
          </Text>
          <Text style={styles.default_text}>
            Nombre de votes : {film.vote_count}
          </Text>
          <Text style={styles.default_text}>
            Budget : {numeral(film.budget).format('0,0[.]00 $')}
          </Text>
          <Text style={styles.default_text}>
            Genre(s) :{' '}
            {film.genres
              .map(function (genre) {
                return genre.name
              })
              .join(' / ')}
          </Text>
          <Text style={styles.default_text}>
            Companie(s) :{' '}
            {film.production_companies
              .map(function (company) {
                return company.name
              })
              .join(' / ')}
          </Text>
        </ScrollView>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  scrollview_container: {
    flex: 1,
  },
  image: {
    height: 169,
    margin: 5,
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center',
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15,
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
  favorite_container: {
    alignItems: 'center',
  },
  favorite_image: {
    width: 40,
    height: 40,
  },
})
export default FilmDetails

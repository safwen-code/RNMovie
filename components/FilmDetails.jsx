import { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Share,
  Platform, // Don't forget to import Platform
} from 'react-native'
import Spinner from './Spinner'
import { getfilmbyid } from '../Helpers/MVapi'
import { useSelector, useDispatch } from 'react-redux'

import moment from 'moment/moment'
import numeral from 'numeral'
import EnlargeShrink from '../animation/EnlargeShrink'

const FilmDetails = ({ route }) => {
  const favorite = useSelector((state) => state.favorite)
  const { favoritesFilm } = favorite

  const { idfilm } = route.params || {}
  const [film, setFilm] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getfilmbyid(idfilm).then((data) => {
      setFilm(data)
      setLoading(false)
    })
  }, [idfilm]) // Removed getfilmbyid from dependencies as it's imported

  const dispatch = useDispatch()
  const handleToggleFavorite = () => {
    dispatch({ type: 'TOGGLE_FAVORITE', value: film })
  }

  const displayFavoriteImage = () => {
    const isFavorite =
      favoritesFilm.findIndex((item) => item.id === film.id) !== -1
    const sourceImage = isFavorite
      ? require('../Images/favorite.png')
      : require('../Images/favorie.png')

    return (
      <EnlargeShrink shouldEnlarge={isFavorite}>
        <Image
          style={[styles.favorite_image, { width: 40, height: 40 }]}
          source={sourceImage}
        />
      </EnlargeShrink>
    )
  }

  const shareFilm = () => {
    if (film) {
      Share.share({ title: film.title, message: film.overview })
    }
  }

  const FloatActionButton = () => {
    if (film != undefined && Platform.OS === 'android') {
      return (
        <TouchableOpacity
          style={styles.share_touchable_floatingactionbutton}
          onPress={shareFilm} // Removed the () to prevent immediate invocation
        >
          <Image
            style={styles.share_image}
            source={require('../Images/share.png')}
          />
        </TouchableOpacity>
      )
    }
    return null
  }

  return (
    <View style={styles.main_container}>
      {loading ? (
        <Spinner />
      ) : film ? (
        <>
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
              Sorti le{' '}
              {moment(new Date(film.release_date)).format('DD/MM/YYYY')}
            </Text>
            <Text style={styles.default_text}>
              Note : {film.vote_average} / 10
            </Text>
            <Text style={styles.default_text}>
              Nombre de votes : {film.vote_count}
            </Text>
            <Text style={styles.default_text}>
              Budget :{' '}
              {film.budget ? numeral(film.budget).format('0,0[.]00 $') : 'N/A'}
            </Text>
            <Text style={styles.default_text}>
              Genre(s) :{' '}
              {film.genres && film.genres.length > 0
                ? film.genres.map((genre) => genre.name).join(' / ')
                : 'N/A'}
            </Text>
            <Text style={styles.default_text}>
              Companie(s) :{' '}
              {film.production_companies && film.production_companies.length > 0
                ? film.production_companies
                    .map((company) => company.name)
                    .join(' / ')
                : 'N/A'}
            </Text>
          </ScrollView>
          <FloatActionButton />
        </>
      ) : (
        <Text>No film data available</Text>
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
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  share_touchable_floatingactionbutton: {
    position: 'absolute',
    width: 60,
    height: 60,
    right: 30,
    bottom: 30,
    borderRadius: 30,
    backgroundColor: '#e91e63',
    justifyContent: 'center',
    alignItems: 'center',
  },
  share_image: {
    width: 30,
    height: 30,
  },
})

export default FilmDetails

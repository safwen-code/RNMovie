import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native'
import FadeIn from '../animation/FadeIn'

const FilmsItems = ({ film, getFilmId, isFilmFavorite }) => {
  const displayFavImg = () => {
    if (isFilmFavorite) {
      return (
        <Image
          style={styles.favorite_image}
          source={require('../Images/favorite.png')}
        />
      )
    }
    return null // Explicit return for all paths
  }

  return (
    <FadeIn>
      <TouchableOpacity
        style={styles.main_container}
        onPress={() => {
          getFilmId(film.id)
        }}
      >
        <Image
          style={styles.image}
          source={{ uri: `https://image.tmdb.org/t/p/w500${film.poster_path}` }}
        />
        <View style={styles.content_container}>
          <View style={styles.header_container}>
            {displayFavImg()}
            <Text style={styles.title_text}>{film.title}</Text>
            <Text style={styles.vote_text}>{film.vote_average}</Text>
          </View>
          <View style={styles.description_container}>
            <Text style={styles.description_text} numberOfLines={6}>
              {film.overview}
            </Text>
          </View>
          <View style={styles.date_container}>
            <Text style={styles.date_text}>Sorti le {film.release_date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </FadeIn>
  )
}

export default FilmsItems

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection: 'row',
  },
  image: {
    width: 120,
    height: 180,
    margin: 5,
    backgroundColor: 'gray',
  },
  content_container: {
    flex: 1,
    margin: 5,
  },
  header_container: {
    flex: 3,
    flexDirection: 'row',
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5,
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#666666',
  },
  description_container: {
    flex: 7,
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
  },
  date_container: {
    flex: 1,
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14,
  },
  favorite_image: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
})

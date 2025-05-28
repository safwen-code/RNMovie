const api = 'ca7772cab3600a541ec81c6af24f6645'

//get film by text
export const getfilmbytext = (text) => {
  const url =
    'https://api.themoviedb.org/3/search/movie?api_key=' +
    api +
    '&language=fr&query=' +
    text
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

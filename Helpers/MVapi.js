const api = 'ca7772cab3600a541ec81c6af24f6645'

//get film by text
export const getfilmbytext = (text, page) => {
  // console.log(text)
  const url =
    'https://api.themoviedb.org/3/search/movie?query=' +
    text +
    '&api_key=' +
    api +
    '&page=' +
    page
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

//get film by id
export const getfilmbyid = (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${api}&language=fr`
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

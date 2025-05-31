import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import toggleFavorite from './Reducers/favoriteReducer.js'

const rootReducer = combineReducers({
  favorite: toggleFavorite,
})

const Store = configureStore({
  reducer: rootReducer,
})

export default Store

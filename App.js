import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Search from './components/Search'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import FilmDetails from './components/FilmDetails'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Search} />
        <Stack.Screen
          name="Detailfilm"
          component={FilmDetails}
          options={{ title: 'Film Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

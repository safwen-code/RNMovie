import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Store from './store'
import Search from './components/Search'
import FilmDetails from './components/FilmDetails'
import Favorites from './components/Favorites'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          title: 'Search',
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="FilmDetails"
        component={FilmDetails}
        options={{
          title: 'Film Details',
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  )
}

function FavoritesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={{
          title: 'Favorites',
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="FilmDetails"
        component={FilmDetails}
        options={{
          title: 'Film Details',
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  )
}

const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false, // Disable  headers
            tabBarIcon: ({ focused, color, size }) => {
              let iconName

              if (route.name === 'SearchTab') {
                iconName = focused ? 'search' : 'search-outline'
              } else if (route.name === 'FavoritesTab') {
                iconName = focused ? 'heart' : 'heart-outline'
              }

              return <Ionicons name={iconName} size={size} color={color} />
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen
            name="SearchTab"
            component={SearchStack}
            options={{ title: 'Search' }}
          />
          <Tab.Screen
            name="FavoritesTab"
            component={FavoritesStack}
            options={{ title: 'Favorites' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
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

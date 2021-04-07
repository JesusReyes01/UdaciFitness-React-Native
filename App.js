import React from 'react'
import { View, Platform } from 'react-native'
import AddEntry from './components/AddEntry'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import History from './components/History'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { purple, white } from './utils/colors'

const Tab = 
  Platform.OS === 'ios'
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator()

// Redux setup omitted

export default function App() {
  // Uncomment to reset local data:
  // AsyncStorage.clear()

  return (
    <Provider store={createStore(reducer)}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="AddEntry"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let icon
              if (route.name === 'Add Entry') {
                icon = (
                  <FontAwesome name="plus-square" size={size} color={color} />
                )
              } else if (route.name === 'History') {
                icon = (
                  <Ionicons name="ios-bookmarks" size={size} color={color} />
                )
              }
              return icon
            },
          })}
          tabBarOptions={{
            activeTintColor: Platform.OS === 'ios' ? purple : white,
            style: {
              height: 80,
              backgroundColor: Platform.OS === "ios" ? white : purple,
              shadowColor: "rgba(0, 0, 0, 0.24)",
              shadowOffset: {
                width: 0,
                height: 3
              },
              shadowRadius: 6,
              shadowOpacity: 1
            },
            indicatorStyle: {
              // Android tab indicator (line at the bottom of the tab)
              backgroundColor: 'yellow',
            },
          }}
        >
          <Tab.Screen name="Add Entry" component={AddEntry} />
          <Tab.Screen name="History" component={History} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

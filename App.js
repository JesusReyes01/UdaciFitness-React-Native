import 'react-native-gesture-handler';
import React from 'react'
import { StyleSheet, Text, View, Platform, StatusBar} from 'react-native'
import AddEntry from './components/AddEntry'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import History from './components/History'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { purple, white } from './utils/colors'
import Constants from 'expo-constants'
// import { StatusBar } from 'expo-status-bar';
import EntryDetail from './components/EntryDetail'

function UdaciStatusBar ({ backgroundColor, ...props }){
  return(
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}


const RouteConfigs = {
  History: {
    name: 'History',
    component: History,
    options: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
      ),
      title: 'History',
    },
  },
  AddEntry: {
    component: AddEntry,
    name: 'Add Entry',
    options: {
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name='plus-square' size={30} color={tintColor} />
      ),
      title: 'Add Entry',
    },
  },
};

const TabNavigatorConfig = {
  navigationOptions: {
    header: null,
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 120,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1,
    },
    indicatorStyle: {
      backgroundColor: 'yellow',
    },
  },
};

const Tab =
  Platform.OS === 'ios'
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator();

const TabNav = () => (
  <Tab.Navigator {...TabNavigatorConfig}>
    <Tab.Screen {...RouteConfigs['History']} />
    <Tab.Screen {...RouteConfigs['AddEntry']} />
  </Tab.Navigator>
);

// Config for StackNav
const StackNavigatorConfig = {
  headerMode: 'screen',
};
const StackConfig = {
  TabNav: {
    name: 'Home',
    component: TabNav,
    options: { headerShown: false },
  },
  EntryDetail: {
    name: 'Entry Detail',
    component: EntryDetail,
    options: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
      title: 'Entry Detail',
    },
  },
};
const Stack = createStackNavigator();
const MainNav = () => (
  <Stack.Navigator {...StackNavigatorConfig}>
    <Stack.Screen {...StackConfig['TabNav']} />
    <Stack.Screen {...StackConfig['EntryDetail']} />
  </Stack.Navigator>
);

// Redux setup omitted

export default function App() {
  // Uncomment to reset local data:
  // AsyncStorage.clear()

  return (
    <Provider store={createStore(reducer)}>
      <UdaciStatusBar backgroundColor={purple} style="light" />
      <NavigationContainer>
        <MainNav />
        {/* <Tab.Navigator
          initialRouteName="Add Entry"
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
        </Tab.Navigator> */}
      </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

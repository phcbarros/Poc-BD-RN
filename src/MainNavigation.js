import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import RealmPageNavigation from './pages/realm'
import SQLitePage from './pages/sqlite'
import { Icon } from 'react-native-elements'

const Tab = createBottomTabNavigator()

export default function MainNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="realm"
      screenOptions={screenOptions}
      tabBarOptions={tabBarOptions}>
      <Tab.Screen
        name="realm"
        component={RealmPageNavigation}
        options={{
          title: 'RealmDB',
        }}
      />
      <Tab.Screen
        name="sqlite"
        component={SQLitePage}
        options={{
          title: 'SQLite',
        }}
      />
    </Tab.Navigator>
  )
}

const tabBarOptions = {
  showLabel: true,
  labelStyle: {
    fontSize: 12,
  },
}

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName

    if (route.name === 'realm') {
      iconName = focused ? 'file-document' : 'file-document-outline'
    } else if (route.name === 'sqlite') {
      iconName = focused ? 'database' : 'database-remove'
    }

    // You can return any component that you like here!
    return (
      <Icon
        name={iconName}
        type="material-community"
        size={size}
        color={color}
      />
    )
  },
})

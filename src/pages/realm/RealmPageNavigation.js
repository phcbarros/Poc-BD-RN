import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import RealmPage from './RealmPage'
import PostListPage from '../posts'

const Stack = createStackNavigator()

export default function RealmPageNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="realm-home"
      screenOptions={{
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        name="realm-home"
        component={RealmPage}
        options={{
          title: 'Realm - Home',
        }}
      />
      <Stack.Screen
        name="realm-posts"
        component={PostListPage}
        options={{
          title: 'Realm - Posts',
        }}
      />
    </Stack.Navigator>
  )
}

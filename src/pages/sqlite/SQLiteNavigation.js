import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SQLitePage from './SQLitePage'
import PostListPage from '../posts'

const Stack = createStackNavigator()

export default function SQLiteNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="sqlite-home"
      screenOptions={{
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        name="realm-home"
        component={SQLitePage}
        options={{
          title: 'SQLite - Home',
        }}
      />
      <Stack.Screen
        name="sqlite-posts"
        component={PostListPage}
        options={{
          title: 'SQLite - Posts',
        }}
      />
    </Stack.Navigator>
  )
}

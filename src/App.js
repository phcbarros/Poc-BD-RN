import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import MainPage from './MainPage'
import RealmPage from './pages/RealmPage'
import SQLitePage from './pages/SQLitePage'

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <MainPage />
      </SafeAreaView>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

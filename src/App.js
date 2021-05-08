import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import MainNavigation from './MainNavigation'

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <MainNavigation />
      </SafeAreaView>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

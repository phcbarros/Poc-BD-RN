import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import RealmPage from './pages/RealmPage'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <RealmPage />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
})

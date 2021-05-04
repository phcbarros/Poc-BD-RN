import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import RealmPage from './pages/RealmPage'
import SQLitePage from './pages/SQLitePage'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <RealmPage /> */}
      <SQLitePage />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
})

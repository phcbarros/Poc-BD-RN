import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { createTables, executeQuery } from '../services/sqlite'

export default function SQLitePage() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    createTables()
  }, [])

  function loadUsers() {
    const sql = `SELECT * FROM users`

    const data = executeQuery(sql, [], (err) => {
      console.warn(err)
    })

    setUsers(data)
  }

  return (
    <View>
      <Text>Teste SQLite</Text>
      <Button title="Carregar usuarios" onPress={loadUsers} />
    </View>
  )
}

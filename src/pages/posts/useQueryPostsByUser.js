import { useState, useCallback } from 'react'
import { getRealm, sqlite } from '../../services'

export default function useQueryPostByUser(provider) {
  const [error, setError] = useState('')

  const queryPostsByIdOnSQLite = useCallback(async (id) => {
    try {
      const sql = 'SELECT * FROM posts WHERE user_id=?'
      return await sqlite.executeQueryAsync(sql, [id])
    } catch (err) {
      setError('Erro ao buscar os posts')
      return []
    }
  }, [])

  const queryPostsByIdOnRealm = useCallback((id) => {
    const realm = getRealm()
    return realm.objects('Post').filtered(`user.id == ${id}`)
  }, [])

  const queryPostsByUserId = useCallback(
    (id) => {
      return provider === 'realm'
        ? queryPostsByIdOnRealm(id)
        : queryPostsByIdOnSQLite(id)
    },
    [provider, queryPostsByIdOnRealm, queryPostsByIdOnSQLite],
  )

  return {
    error,
    queryPostsByUserId,
  }
}

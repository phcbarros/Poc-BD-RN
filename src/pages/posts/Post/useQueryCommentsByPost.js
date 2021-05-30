import { useCallback, useEffect, useState } from 'react'
import { getRealm, sqlite } from 'services'

export default function useQueryCommentsByPost(id, provider) {
  const [comments, setComments] = useState([])
  const [error, setError] = useState('')

  const queryCommentsByPostIdOnRealm = useCallback(() => {
    try {
      setError('')
      const realm = getRealm()
      const data = realm.objects('Comment').filtered(`post.id == ${id}`)
      setComments(data)
    } catch (err) {
      setError('Erro ao obter os dados no Realm')
    }
  }, [id])

  const queryCommentsByPostIdOnSQLite = useCallback(async () => {
    try {
      setError('')
      const sql = 'SELECT * FROM comments WHERE post_id=?'
      const data = await sqlite.executeQueryAsync(sql, [id])
      setComments(data)
    } catch (err) {
      setError('Erro ao obter os dados no SQLite')
    }
  }, [id])

  useEffect(() => {
    return provider === 'realm'
      ? queryCommentsByPostIdOnRealm()
      : queryCommentsByPostIdOnSQLite()
  }, [provider, queryCommentsByPostIdOnRealm, queryCommentsByPostIdOnSQLite])

  return { comments, error }
}
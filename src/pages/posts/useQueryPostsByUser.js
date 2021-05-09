import { useState, useEffect } from 'react'
import { getRealm, sqlite } from '../../services'

export default function useQueryPostByUser(id, provider) {
  const [posts, setPosts] = useState([])
  const [error, setError] = useState('')
  useEffect(() => {
    if (provider === 'realm') {
      const realm = getRealm()
      const data = realm.objects('Post').filtered(`user.id == ${id}`)
      setPosts(data)
    } else {
      const sql = 'SELECT * FROM posts WHERE user_id=?'
      sqlite.executeQuery(
        sql,
        [id],
        (results) => {
          setPosts(results._array)
        },
        () => setError('Erro ao listar os posts'),
      )
    }
  }, [provider, id])

  return {
    posts,
    error,
  }
}

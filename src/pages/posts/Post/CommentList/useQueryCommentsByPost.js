import { useCallback, useEffect, useState } from 'react'
import { getRealm } from 'services'

export default function useQueryCommentsByPost(id) {
  const [comments, setComments] = useState([])
  const [error, setError] = useState('')

  const queryCommentsByPostIdOnRealm = useCallback(() => {
    try {
      setError('')
      const realm = getRealm()
      const data = realm.objects('Comment').filtered(`post.id == ${id}`)
      setComments(data)
    } catch (err) {
      setError('Erro ao obter os dados do Realm')
    }
  }, [id])

  useEffect(() => {
    queryCommentsByPostIdOnRealm()
  }, [queryCommentsByPostIdOnRealm])

  return { comments, error }
}
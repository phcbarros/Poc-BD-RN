import Realm from 'realm'
import { PostsSchema, UsersSchema, CommentsSchema } from '../schemas/Schemas'

export function getRealm() {
  return Realm.open({
    schema: [UsersSchema, PostsSchema, CommentsSchema],
  })
}

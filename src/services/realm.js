import Realm from 'realm'
import { PostSchema, UserSchema, CommentSchema } from '../schemas/Schemas'

export function getRealm() {
  return new Realm({
    schema: [UserSchema, PostSchema, CommentSchema],
  })
}

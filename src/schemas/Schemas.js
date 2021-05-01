export const PostSchema = {
  name: 'Post',
  primaryKey: 'id',
  properties: {
    id: { type: 'int', indexed: true },
    title: 'string',
    body: 'string',
    user: 'User',
  },
}
export const UserSchema = {
  name: 'User',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    username: { type: 'string', mapTo: 'userName' },
    email: 'string',
  },
}

export const CommentSchema = {
  name: 'Comment',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    email: 'string',
    body: 'string',
    post: 'Post',
  },
}

export const PostsSchema = {
  name: 'Posts',
  primaryKey: 'id',
  properties: {
    id: { type: 'int', indexed: true },
    title: 'string',
    body: 'string',
    user: 'Users',
  },
}

export const UsersSchema = {
  name: 'Users',
  primaryKey: 'id',
  schemaVersion: 2,
  properties: {
    id: 'int',
    name: 'string',
    username: { type: 'string', mapTo: 'userName' },
    email: 'string',
  },
}

export const CommentsSchema = {
  name: 'Comments',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    email: 'string',
    body: 'string',
    post: 'Posts',
  },
}

import SQLite from 'react-native-sqlite-2'

function openConnection() {
  return SQLite.openDatabase('test.db', '1.0', '', 1)
}

export function createTables() {
  const connection = openConnection()
  connection.transaction((ctx) => {
    ctx.executeSql('DROP TABLE IF EXISTS Users', [])
    ctx.executeSql(
      `CREATE TABLE IF NOT EXISTS Users(
        id INTEGER PRIMARY KEY NOT NULL,
        name VARCHAR NOT NULL,
        username VARCHAR NOT NULL,
        email VARCHAR NOT NULL
        )`,
      [],
    )
    ctx.executeSql('DROP TABLE IF EXISTS Posts', [])
    ctx.executeSql(
      `CREATE TABLE IF NOT EXISTS Posts(
          id INTEGER PRIMARY KEY NOT NULL,
          title VARCHAR NOT NULL,
          body VARCHAR NOT NULL,
          user_id INTEGER NOT NULL,
          FOREIGN KEY ( user_id ) REFERENCES Users ( id )
        )`,
      [],
    )
    ctx.executeSql('DROP TABLE IF EXISTS Comments', [])
    ctx.executeSql(
      `CREATE TABLE IF NOT EXISTS Comments(
          id INTEGER PRIMARY KEY NOT NULL,
          name VARCHAR NOT NULL,
          email VARCHAR NOT NULL,
          body VARCHAR NOT NULL,
          post_id INTEGER NOT NULL,
          FOREIGN KEY ( post_id ) REFERENCES Posts ( id )
        )`,
      [],
    )
  })
}

export function save(sql, args) {
  const connection = openConnection()
  connection.transaction((ctx) => {
    ctx.executeSql(sql, [], null, (err) => {
      console.log('error', err)
    })
  })
}

export function executeQuery(sql, args, fnSuccess, fnError) {
  const connection = openConnection()
  return connection.transaction((ctx) => {
    ctx.executeSql(
      sql,
      [...args],
      (tx, results) => {
        fnSuccess(results.rows)
      },
      (err) => {
        fnError(err)
      },
    )
  })
}

export function executeQueryFunc(...args) {
  const [sql, params, fnSuccess, fnError] = args
  openConnection().transaction((ctx) => {
    ctx.executeSql(
      sql,
      params,
      (_, results) => fnSuccess(results.rows._array),
      (err) => fnError(err),
    )
  })
}

function functionToPromise(fn, ...args) {
  return new Promise((resolve, reject) => fn(...args, resolve, reject))
}

const executeQueryAsync = (sql, args) =>
  functionToPromise(executeQueryFunc, sql, args)

export default {
  executeQuery,
  createTables,
  save,
  executeQueryAsync,
}

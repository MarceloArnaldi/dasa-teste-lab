// Update with your config settings.

module.exports = {

  client: 'postgresql',
  connection: {
    database: 'dasa_teste',
    user:     'postgres',
    password: 'ariane'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }

};

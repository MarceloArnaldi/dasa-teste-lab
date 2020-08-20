// Update with your config settings.

module.exports = {

    client: 'postgresql',
    connection: {
      host: 'db',
      database: 'dasa',
      user:     'postgres',
      password: 'dasa'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }

};

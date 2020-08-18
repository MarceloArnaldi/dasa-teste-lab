// use esse modelo para atualizar o arquivo homônimo na pasta "migrations"
exports.up = function(knex, Promise) {
    return knex.schema.createTable('examsbylabs', table => {
        table.integer('labs_id').notNull()
        table.integer('exams_id').notNull()
        table.unique(['labs_id', 'exams_id'])
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('examsbylabs')
};
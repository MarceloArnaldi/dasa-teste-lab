// use esse modelo para atualizar o arquivo homônimo na pasta "migrations"
exports.up = function(knex, Promise) {
    return knex.schema.createTable('labs', table => {
        table.increments('id').primary()
        table.string('nome').notNull().unique()
        table.string('endereco').notNull()
        table.string('status').notNull().defaultTo("ativo")
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('labs')
};

exports.up = async function(knex) {
    await knex.schema.table('attempts', (table) => {
        table.dropColumn('u_id');
    });
    await knex.schema.table('attempts', (table) => {
        table.integer('u_id').references('users.id');
        table.integer('Score');
    });
};

exports.down = function(knex) {};
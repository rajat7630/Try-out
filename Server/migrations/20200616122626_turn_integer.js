
exports.up = async function (knex) {

    await knex.schema.table("problems", (table) => {
        table.string("description", 10000);
        table.integer('timelimit');
        table.integer('datalimit');
    })
};

exports.down = function (knex) {

};

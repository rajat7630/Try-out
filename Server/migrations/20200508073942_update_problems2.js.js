
exports.up = async function(knex) {
    await knex.schema.table('problems', (table) => {
        table.string('problemName').unique();
        table.string('timelimit');
        table.string('datalimit');
        table.string('tags');
        table.string('solution');
      });
};

exports.down = function(knex) {
  
};

exports.up = async function (knex) {
  await knex.schema.table('tests', (table) => {
    table.dropColumn('testName');
  });
  await knex.schema.table('tests', (table) => {
    table.string('testName').unique();
    table.integer('timelimit');
    table.string('tags');
  });
  await knex.schema.table('testProblems', (table) => {
    table.integer('score');
  });
};

exports.down = function (knex) {};

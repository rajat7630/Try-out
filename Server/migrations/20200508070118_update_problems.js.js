exports.up = async function (knex) {
  try {
    await knex.schema.table('problems', (table) => {
      table.dropColumn('problemName');
      table.dropColumn('difficultyLevel');
    });
  } catch (err) {
    console.log(err);
  }
};

exports.down = function (knex) {};

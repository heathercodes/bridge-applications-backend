exports.up = async knex =>
  await knex.schema.table("users", table => {
    table.string("sub");
  });

exports.down = async knex =>
  await knex.schema.table("users", table => {
    table.dropColumn("sub");
  });
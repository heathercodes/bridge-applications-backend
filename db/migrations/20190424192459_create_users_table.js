
exports.up = knex => knex.schema.createTable('users', table => {
    table.increments();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('email').notNullable().unique();
    table.string('pronouns').notNullable();
    table
        .enu('employment_status', [
            'full_time',
            'part_time',
            'in_school',
            'looking',
            'not_looking'
        ])
        .notNullable();
    table.string('employer');
    table.string('role').notNullable();
}).createTable('identifying_info', table => {
    table.increments();
    table.string('name');
    table.boolean('is_gender').notNullable();
    table.boolean('is_user_generated').notNullable();
}).createTable('users_identifying_info', table => {
    table.increments();
    table
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users');
    table
      .integer('identifying_info_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('identifying_info');
  });

exports.down = knex => knex.schema
    .dropTable('users_identifying_info')
    .dropTable('identifying_info')
    .dropTable('users')


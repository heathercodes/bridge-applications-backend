
exports.up = knex => knex.schema.createTable('questions', table => {
    table.increments();
    table.string('question_text').notNullable();
}).createTable('answer_choices', table => {
    table.increments();
    table.text('choice').notNullable();
    table.integer('question_id').notNullable().references('id').inTable('questions');
}).createTable('responses', table => {
    table.increments();
    table.integer('user_id').notNullable().references('id').inTable('users');
    table.integer('question_id').notNullable().references('id').inTable('questions');
    table.integer('answer_id').notNullable().references('id').inTable('answer_choices');
    table.text('user_response').notNullable();
});

exports.down = knex => knex.schema
    .dropTable('responses')
    .dropTable('answer_choices')
    .dropTable('questions')


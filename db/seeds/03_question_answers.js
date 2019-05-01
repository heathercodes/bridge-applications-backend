const faker = require('faker');

const createQuestions = () => {
    return {
        question_text: faker.lorem.sentence(),
    };
};

const createNQuestion = (n, func) =>
    Array.from(Array(n)).map(element => func());

const createNText = (array) => array[Math.floor(Math.random()*array.length)];

exports.seed = knex => {
    return knex('questions')
        .del()
        .then(() => {
            return knex('questions').returning('id').insert(createNQuestion(16, createQuestions)).then((question_ids) => {
                    return knex("answer_choices").returning('id').insert(question_ids.map((question_id) => {
                        return {
                            choice: faker.lorem.sentence(),
                            question_id
                        }
                    })).then((answer_ids) => {
                            return knex("users").select('id').then((user_ids) => {
                                return knex("responses").insert(user_ids.map((user_id) => {
                                    return {
                                        user_id: user_id.id,
                                        question_id: createNText(question_ids),
                                        answer_id: createNText(answer_ids),
                                        user_response: faker.lorem.paragraph()
                                    }
                                }))
                            })
                        })
                })
        })
};
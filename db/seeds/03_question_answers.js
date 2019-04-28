const faker = require('faker');

const createQuestions = () => {
    return {
        question_text: faker.lorem.sentence(),
    };
};

const createAnswersChoices = () => {
    return {
        choice: faker.lorem.paragraph(),
    };
};

const createResponses = () => {
    return {
        choice: faker.lorem.paragraph(),
    };
};

const createNText = (n, func) =>
    Array.from(Array(n)).map(element => func());

exports.seed = knex => {
    return knex('questions')
      .del()
      .then(() => {
        return knex('questions').insert(createNText(16, createQuestions));
    }).then(() => {
        return knex('answer_choices').del().then(() => {
            return knex('answer_choices').insert(createNText(16, createAnswersChoices));
        });
    }).then(() => {
        return knex('responses').del().then(() => {
            return knex('responses').insert(createNText(60, createResponses));
        });
    })
};
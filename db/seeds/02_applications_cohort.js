const faker = require('faker');

const cohorts = [
    {
        name: 'Cohort 3',
        start_date: faker.date.recent(),
        end_date: faker.date.recent(),
        welcome_text: faker.lorem.paragraph(),
        thank_you_text: faker.lorem.paragraph(),
    },
    {
        name: 'Cohort 4 Tulip',
        start_date: faker.date.recent(),
        end_date: faker.date.recent(),
        welcome_text: faker.lorem.paragraph(),
        thank_you_text: faker.lorem.paragraph(),
    },
    {
        name: 'Cohort 2 Design',
        start_date: faker.date.recent(),
        end_date: faker.date.recent(),
        welcome_text: faker.lorem.paragraph(),
        thank_you_text: faker.lorem.paragraph(),
    },
    {
        name: 'Cohort 7 Back End',
        start_date: faker.date.recent(),
        end_date: faker.date.recent(),
        welcome_text: faker.lorem.paragraph(),
        thank_you_text: faker.lorem.paragraph(),
    }
];

const createAcceptance = () => {
    return {
        accepted_test: faker.random.boolean(),
        accepted_cohort: faker.random.boolean()
    };
};
  
const createNAcceptances = n =>
    Array.from(Array(n)).map(element => createAcceptance());


exports.seed = knex => {
    return knex('cohorts')
      .del()
      .then(() => {
        return knex('cohorts').insert(cohorts);
    }).then(() => {
        return knex('applications').del().then(() => {
            return knex('applications').insert(createNAcceptances(20))
        });
    })
};
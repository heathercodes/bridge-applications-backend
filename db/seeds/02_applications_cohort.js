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

const createNAcceptances = n =>
    Array.from(Array(n)).map(element => createAcceptance());


exports.seed = knex => {
    return knex('cohorts')
      .del()
      .then(() => {
        return knex('cohorts').returning("id").insert(cohorts).then((cohort_ids) => {
            knex("users").returning('id').then((user_ids) => {
                return knex("applications").insert(user_ids.map((user_id) => {
                    return {
                        user_id: user_id.id,
                        cohort_id: cohort_ids[3],
                        accepted_test: faker.random.boolean(),
                        accepted_cohort: faker.random.boolean()
                    }
                }))
            })
        })
    })
}
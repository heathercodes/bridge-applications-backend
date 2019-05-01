const faker = require('faker');

const identifyingInfoArray = [
    {
        name: 'Woman',
        is_gender: true,
        is_user_generated: false
    },
    {
        name: 'LGBTQIA+',
        is_gender: false,
        is_user_generated: false
    },
    {
        name: 'Non Binary',
        is_gender: true,
        is_user_generated: false
    },
    {
        name: 'Indigeous Person',
        is_gender: false,
        is_user_generated: false
    },
    {
        name: 'Agender',
        is_gender: true,
        is_user_generated: false
    },
    {
        name: 'Man',
        is_gender: false,
        is_user_generated: false
    },
    {
        name: 'Prefer not to disclose',
        is_gender: false,
        is_user_generated: false
    },
    {
        name: 'Unicorn',
        is_gender: true,
        is_user_generated: true
    },
    {
        name: 'Chinese',
        is_gender: false,
        is_user_generated: true
    },
    {
        name: 'First Nations',
        is_gender: false,
        is_user_generated: true
    },
];

const createStudent = () => {
    const firstName = faker.name.firstName(1);
    const lastName = faker.name.lastName();
    return {
        first_name: firstName,
        last_name:lastName,
        email: faker.internet.email(firstName, lastName),
        pronouns: "she/they",
        employment_status: "full_time",
        employer: faker.company.companyName()
    };
};
  
const createNStudents = n =>
    Array.from(Array(n)).map(element => createStudent());
  
exports.seed = knex => {
    // Deletes ALL existing entries
    return knex("users")
      .del()
      .then(() => {
        // Inserts seed entries
        return knex("identifying_info").del().then(() => {
          knex("identifying_info").returning("id").insert(identifyingInfoArray)
          .then((info_ids) => {
            return knex("users").returning('id').insert(createNStudents(20))
              .then((user_ids) => (
                knex("users_identifying_info").insert(user_ids.map((user_id) => ({
                  user_id,
                  identifying_info_id: faker.helpers.randomize(info_ids)
                })))
              ));
          })
        })
      });
    };


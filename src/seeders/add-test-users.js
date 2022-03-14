'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const time = new Date();
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'John Doe',
          email: 'john@doe.com',
          password_hash: bcrypt.hashSync('myPlaintextPassword', 10),
          role: 'subscriber',
          createdAt: time,
          updatedAt: time,
        },
        {
          name: 'Jane Doe',
          email: 'jane@doe.com',
          password_hash: bcrypt.hashSync('anotherPl@int3xtPassword', 10),
          role: 'customer',
          createdAt: time,
          updatedAt: time,
        },
        {
          name: 'Roni Jones',
          email: 'ronijones@gmail.com',
          password_hash: bcrypt.hashSync('adasddaddad!', 10),
          role: 'customer',
          createdAt: time,
          updatedAt: time,
        },
        {
          name: 'admin',
          email: 'admin@gmail.app',
          password_hash: bcrypt.hashSync('ougf1616wig43', 10),
          role: 'admin',
          createdAt: time,
          updatedAt: time,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};

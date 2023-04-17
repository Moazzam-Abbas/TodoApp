const uuid = require('uuid');
const uuidv1 = uuid.v1;
module.exports = {
    up: async (queryInterface, Sequelize) => {
      try {
        const records = [
          { id: uuidv1(), userName: "Miller", password: 'Password123!' },
          { id: uuidv1(), userName: "Kate", password: 'Password123!' },
          { id: uuidv1(), userName: "Jane", password: 'Password123!' },
          { id: uuidv1(), userName: "Argo", password: 'Password123!' },
          { id: uuidv1(), userName: "William", password: 'Password123!' },
        ];

      await queryInterface.bulkInsert('user', records, { returning: true });

      await queryInterface.bulkInsert('todo', [{
        id: uuidv1(),
        title: 'work',
        description: 'complete',
        userId: records[0].id
      },
      {
        id: uuidv1(),
        title: 'work2',
        description: 'complete',
        userId: records[0].id
      },
      {
        id: uuidv1(),
        title: 'work3',
        description: 'complete',
        userId: records[1].id
      },
      {
        id: uuidv1(),
        title: 'work4',
        description: 'complete',
        userId: records[1].id
      }
    ]);
  } catch (error) {
    console.error(error);
    throw error;
  }

    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('todo', null, {});
      await queryInterface.bulkDelete('user', null, {});
    }
  };
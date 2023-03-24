module.exports = {

  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('user', {
        id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true
        },
        userName: { type: Sequelize.DataTypes.STRING, allowNull: false },
        password: { type: Sequelize.DataTypes.STRING, allowNull: false },
        createdAt: { type: Sequelize.DataTypes.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') },
        updatedAt: { type: Sequelize.DataTypes.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') }
    }, {
        freezeTableName: true,
        timestamps: true
    });
      await queryInterface.createTable('todo', {
          id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true
          },
          title: Sequelize.DataTypes.STRING,
          description: Sequelize.DataTypes.STRING,
          userId: {
            type: Sequelize.DataTypes.UUID,
            references: {
              model: 'user',
              key: 'id'
           },
           onDelete: 'CASCADE',
           onUpdate: 'CASCADE'
          },
          createdAt: { type: Sequelize.DataTypes.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') },
          updatedAt: { type: Sequelize.DataTypes.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') }
      }, {
      freezeTableName: true,
      timestamps: true
    });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable('todo');
      await queryInterface.dropTable('user');
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

}

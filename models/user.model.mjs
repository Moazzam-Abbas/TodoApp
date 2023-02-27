export default (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        userName: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false }
    }, {
        freezeTableName: true
    });

    return User;
};
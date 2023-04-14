export default (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        userName: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false }
    }, {
        freezeTableName: true,
        timestamps: true
    });

    return User;
};
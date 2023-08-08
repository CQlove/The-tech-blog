const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');


class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4, 18]
            }
        }
    },
    {
        hooks: {
            async beforeCreate(newUser) {
                newUser.password = await bcrypt.hash(newUser.password, 12);
                return newUserData;
            },
            async beforeUpdate(updateUser) {
                updateUser.password = await bcrypt.hash(updateUser.password, 12);
                return updateUserData;
            }
        },
        sequelize,
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        modelName: 'user',
    }
);

module.exports = User;
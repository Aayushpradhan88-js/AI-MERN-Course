import { DataTypes } from 'sequelize'
import sequelize from '../../config/connection.js'

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    roles: { //RBAC mail field - middleware check garxaaaa......
        type: DataTypes.ENUM('admin', 'doctor', 'receptionist', 'patient'),
        defaultValue: 'patient'
    },
    refreshToken: {
        type: DataTypes.TEXT,
    }
}, {
    tableName: 'users',
    timestamps: true,
});

export default User
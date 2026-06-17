import { DataTypes } from 'sequelize';
import { sequelize } from '../../models/index.js';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'users',
    timestamps: true, // adds createdAt, updatedAt
});

export default User
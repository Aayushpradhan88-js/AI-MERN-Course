import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/index.js'
import User from '../users/user.model.js';
import Doctor from '../doctor/doctor.model.js';

const Patient = sequelize.define('Patient', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Doctor,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'other'),
    allowNull: false,
  },
  bloodGroup: {
    type: DataTypes.ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
    allowNull: true,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  emergencyContactName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  emergencyContactPhone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  medicalHistory: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  xyz: {
    
  }
}, {
  tableName: 'patients',
  timestamps: true,
});

export default Patient
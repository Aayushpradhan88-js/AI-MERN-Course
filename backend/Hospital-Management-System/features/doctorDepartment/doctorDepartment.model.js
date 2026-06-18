import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/index.js'
import Doctor from '../doctor/doctor.model.js';
import Department from '../deparments/department.model.js';

const DoctorDepartment = sequelize.define('DoctorDepartment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
  departmentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Department,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  role: {
    type: DataTypes.ENUM('head', 'senior', 'junior'),
    defaultValue: 'junior',
  },
  joinedAt: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
}, {
  tableName: 'doctor_departments',
  timestamps: true,
});

export default DoctorDepartment;
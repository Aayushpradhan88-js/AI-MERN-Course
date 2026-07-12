import dotenv from 'dotenv';
dotenv.config();
import sequelize from './config/connection.js';
import Department from './features/deparments/department.model.js';

const test = async () => {
  await sequelize.authenticate();
  const departments = await Department.findAll({ where: { isActive: true } });
  console.log("Found departments:", departments.length);
  process.exit(0);
};

test();

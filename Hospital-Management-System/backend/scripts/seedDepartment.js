import dotenv from 'dotenv';
dotenv.config();
import sequelize from '../config/connection.js';
import Department from '../features/deparments/department.model.js';

const departmentsData = [
  { name: 'Cardiology', description: 'Deals with disorders of the heart as well as some parts of the circulatory system.' },
  { name: 'Neurology', description: 'Deals with disorders of the nervous system.' },
  { name: 'Orthopedics', description: 'Focuses on injuries and diseases of your body\'s musculoskeletal system.' },
  { name: 'Pediatrics', description: 'Involves the medical care of infants, children, and adolescents.' },
  { name: 'Oncology', description: 'Deals with the prevention, diagnosis, and treatment of cancer.' },
  { name: 'Dermatology', description: 'Deals with the skin, nails, hair and its diseases.' },
  { name: 'Psychiatry', description: 'Devoted to the diagnosis, prevention, and treatment of mental disorders.' },
  { name: 'Radiology', description: 'Uses medical imaging to diagnose and treat diseases.' },
  { name: 'General Surgery', description: 'Focuses on abdominal contents including esophagus, stomach, small intestine, large intestine, liver, pancreas, gallbladder, appendix and bile ducts.' },
  { name: 'Emergency Medicine', description: 'Medical specialty involving care for undifferentiated, unscheduled patients with illnesses or injuries requiring immediate medical attention.' }
];

const seedDepartments = async () => {
    try {
        // Connect to the database
        await sequelize.authenticate();
        console.log('Database connected successfully');

        // Sync the model (so the table exists)
        await sequelize.sync({ alter: true });

        console.log('Seeding departments...');
        
        for (const deptData of departmentsData) {
            const [department, created] = await Department.findOrCreate({
                where: { name: deptData.name },
                defaults: deptData
            });

            if (created) {
                console.log(`Created department: ${department.name}`);
            } else {
                console.log(`Department already exists: ${department.name}`);
            }
        }

        console.log('Departments seeded successfully!');

        await sequelize.close();
        process.exit(0);
    } catch (error) {
        console.error('Error seeding departments:', error);
        await sequelize.close();
        process.exit(1);
    }
};

seedDepartments();

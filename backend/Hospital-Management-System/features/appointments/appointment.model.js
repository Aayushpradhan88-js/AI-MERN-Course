import { DataTypes } from 'sequelize'
import sequelize from '../../config/connection.js'

const Appointment = sequelize.define('Appointment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    doctorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    appointmentDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    staus: {
        type: DataTypes.ENUM('pending', 'confirmed', 'completed', 'cancelled'),
        defaultValue: 'pending'
    },
}, {
    tableName: 'appointments',
    timestamps: true,
})

export default Appointment
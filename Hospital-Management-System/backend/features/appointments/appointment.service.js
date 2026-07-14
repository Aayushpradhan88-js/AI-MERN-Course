import Appointment from './appointment.model.js';
import Patient from '../patient/patient.model.js';
import Doctor from '../doctor/doctor.model.js';
import Department from '../deparments/department.model.js';

const createAppointmentService = async (data, currentUser) => {
  const { doctorId, departmentId, appointmentDate, status } = data;
  let { patientId } = data;

  if (currentUser.roles === 'patient') {
    const patient = await Patient.findOne({ where: { userId: currentUser.id } });
    if (!patient) {
      throw { status: 404, message: 'Patient profile not found. Create your profile first' };
    }
    patientId = patient.id;
  } else {
    if (!patientId) {
      throw { status: 400, message: 'patientId is required' };
    }
  }

  const patient = await Patient.findByPk(patientId);
  if (!patient) {
    throw { status: 404, message: `Patient with id ${patientId} does not exist` };
  }

  const doctor = await Doctor.findByPk(doctorId);
  if (!doctor) {
    throw { status: 404, message: `Doctor with id ${doctorId} does not exist` };
  }

  const department = await Department.findByPk(departmentId);
  if (!department) {
    throw { status: 404, message: `Department with id ${departmentId} does not exist` };
  }

  if (!department.isActive) {
    throw { status: 400, message: 'Department is not active' };
  }

  const date = new Date(appointmentDate);
  if (isNaN(date.getTime())) {
    throw { status: 400, message: 'Invalid appointmentDate format. Use ISO 8601 format' };
  }

  if (date <= new Date()) {
    throw { status: 400, message: 'appointmentDate must be in the future' };
  }

  const allowedStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
  const appointmentStatus = status || 'pending';
  if (!allowedStatuses.includes(appointmentStatus)) {
    throw { status: 400, message: `status must be one of: ${allowedStatuses.join(', ')}` };
  }

  const duplicate = await Appointment.findOne({ where: { doctorId, appointmentDate: date } });
  if (duplicate) {
    throw { status: 400, message: 'Doctor already has an appointment at this time' };
  }

  const appointment = await Appointment.create({
    patientId,
    doctorId,
    departmentId,
    appointmentDate: date,
    status: appointmentStatus,
  });

  return appointment.toJSON();
};

export const getAppointmentsService = async (currentUser) => {
  const isPatient = currentUser.roles === 'patient';
  
  // Base query options
  const options = {
    include: [
      { model: Doctor, as: 'doctor', attributes: ['id', 'firstName', 'lastName'] },
      { model: Department, as: 'department', attributes: ['id', 'name'] },
      { model: Patient, as: 'patient', attributes: ['id', 'firstName', 'lastName', 'userId'] }
    ],
    order: [['appointmentDate', 'ASC']]
  };

  // If patient, filter by their own patient record
  // But patient model uses userId to map.
  // Actually, we can fetch all appointments, and if patient, we filter in JS or add a where clause on patient.
  // Wait, Appointment belongs to Patient. So we can add `where` on the Patient association, but it's easier to find the patient first.
  let filterWhere = {};
  if (isPatient) {
    const patient = await Patient.findOne({ where: { userId: currentUser.id } });
    if (!patient) {
      return []; // No profile yet
    }
    filterWhere.patientId = patient.id;
  } else if (currentUser.roles === 'doctor') {
    const doctor = await Doctor.findOne({ where: { userId: currentUser.id } });
    if (!doctor) {
      return []; // No profile yet
    }
    filterWhere.doctorId = doctor.id;
  }

  options.where = filterWhere;

  // Sometimes associations aren't set up perfectly. If includes fail, we will fetch manually. Let's try manual fetch to be safe.
  const appointments = await Appointment.findAll({
    where: filterWhere,
    order: [['appointmentDate', 'ASC']]
  });

  const doctors = await Doctor.findAll();
  const departments = await Department.findAll();
  const patients = await Patient.findAll();

  const enriched = appointments.map(app => {
    const json = app.toJSON();
    const doc = doctors.find(d => d.id === json.doctorId);
    const dep = departments.find(d => d.id === json.departmentId);
    const pat = patients.find(p => p.id === json.patientId);
    
    if (doc) json.doctorDetails = doc.toJSON();
    if (dep) json.departmentDetails = dep.toJSON();
    if (pat) json.patientDetails = pat.toJSON();
    
    return json;
  });

  return enriched;
};

export const updateAppointmentStatusService = async (appointmentId, status) => {
  const allowedStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
  if (!allowedStatuses.includes(status)) {
    throw { status: 400, message: `status must be one of: ${allowedStatuses.join(', ')}` };
  }

  const appointment = await Appointment.findByPk(appointmentId);
  if (!appointment) {
    throw { status: 404, message: 'Appointment not found' };
  }

  appointment.status = status;
  await appointment.save();

  return appointment.toJSON();
};

export const markPatientNotifiedService = async (appointmentId) => {
  const appointment = await Appointment.findByPk(appointmentId);
  if (!appointment) {
    throw { status: 404, message: 'Appointment not found' };
  }

  appointment.patientNotified = true;
  await appointment.save();

  return appointment.toJSON();
};

export default createAppointmentService;

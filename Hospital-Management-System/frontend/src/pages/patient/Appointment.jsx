import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import axios from 'axios'

const PatientAppointment = () => {
  const [filter, setFilter] = useState('All')
  const [showModal, setShowModal] = useState(false)
  const [appointments, setAppointments] = useState([])
  const [departments, setDepartments] = useState([])
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)

  const [formData, setFormData] = useState({
    doctorId: '',
    departmentId: '',
    appointmentDate: '',
    status: 'pending'
  })
  
  const tabs = ['All', 'confirmed', 'pending', 'completed']

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      const [appRes, depRes, docRes] = await Promise.all([
        axios.get('http://localhost:5900/api/appointments', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('http://localhost:5900/api/departments', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('http://localhost:5900/api/doctors', { headers: { Authorization: `Bearer ${token}` } })
      ])
      
      const mappedApps = appRes.data.data.appointments.map(a => ({
        id: a.id,
        doctor: a.doctorDetails ? `Dr. ${a.doctorDetails.lastName}` : 'Unknown',
        specialty: a.departmentDetails ? a.departmentDetails.name : 'Unknown',
        date: new Date(a.appointmentDate).toLocaleDateString(),
        time: new Date(a.appointmentDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        status: a.status
      }))
      
      setAppointments(mappedApps)
      setDepartments(depRes.data.data.departments)
      setDoctors(docRes.data)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  const filtered = filter === 'All' ? appointments : appointments.filter((a) => a.status === filter)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('accessToken')
      await axios.post('http://localhost:5900/api/appointments', {
        ...formData,
        doctorId: Number(formData.doctorId),
        departmentId: Number(formData.departmentId),
        appointmentDate: new Date(formData.appointmentDate).toISOString()
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      alert('Appointment created successfully!')
      setShowModal(false)
      fetchData()
    } catch (error) {
      console.error(error)
      alert(error.response?.data?.message || 'Error creating appointment')
    }
  }

  return (
    <div className="dash-layout">
      <Sidebar role="patient" />
      <main className="dash-main">
        <div className="dash-header">
          <div>
            <h1 className="dash-title">My Appointments</h1>
            <p className="dash-subtitle">Track all your scheduled and past visits</p>
          </div>
          <div className="dash-avatar">J</div>
        </div>

        {/* Tabs and Action */}
        <div className="filter-tabs" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`filter-tab ${filter === tab ? 'filter-tab--active' : ''}`}
                onClick={() => setFilter(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="dash-btn" onClick={() => setShowModal(true)}>New Appointment</button>
        </div>

        {/* Table */}
        <div className="dash-section">
          <div className="table-wrapper">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Doctor</th>
                  <th>Specialty</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="6" style={{ textAlign: 'center' }}>Loading...</td></tr>
                ) : filtered.map((row, i) => (
                  <tr key={i}>
                    <td>{row.doctor}</td>
                    <td className="td-muted">{row.specialty}</td>
                    <td>{row.date}</td>
                    <td className="td-muted">{row.time}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          row.status === 'confirmed'
                            ? 'status-green'
                            : row.status === 'pending'
                            ? 'status-yellow'
                            : 'status-grey'
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td>
                      {row.status !== 'completed' && (
                        <button className="dash-btn dash-btn--sm dash-btn--danger">Cancel</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Modal for New Appointment */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '500px', width: '100%', padding: '2rem', background: '#1e1e2d', borderRadius: '8px', color: '#fff', border: '1px solid #333' }}>
              <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>New Appointment</h2>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <label>
                  Department:
                  <select name="departmentId" value={formData.departmentId} onChange={handleChange} required style={inputStyle}>
                    <option value="">Select Department...</option>
                    {departments.map(dep => (
                      <option key={dep.id} value={dep.id}>{dep.name}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Doctor:
                  <select name="doctorId" value={formData.doctorId} onChange={handleChange} required style={inputStyle}>
                    <option value="">Select Doctor...</option>
                    {doctors.map(doc => (
                      <option key={doc.id} value={doc.id}>Dr. {doc.lastName}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Appointment Date & Time:
                  <input type="datetime-local" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} required style={inputStyle} />
                </label>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                  <button type="button" className="dash-btn" style={{ background: 'transparent', border: '1px solid #444', color: '#ccc' }} onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="dash-btn">Create</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  marginTop: '0.25rem',
  background: '#13131f',
  border: '1px solid #333',
  borderRadius: '4px',
  color: '#fff',
  boxSizing: 'border-box'
}

export default PatientAppointment

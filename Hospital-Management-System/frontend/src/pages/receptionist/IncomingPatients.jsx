import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import axios from 'axios'

const IncomingPatients = () => {
  const [appointments, setAppointments] = useState([])
  const [doctors, setDoctors] = useState([])
  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      
      const [resApp, resDoc, resDep] = await Promise.all([
        axios.get('http://localhost:5900/api/receptionists/patientsrequests', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('http://localhost:5900/api/doctors', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('http://localhost:5900/api/departments', { headers: { Authorization: `Bearer ${token}` } })
      ])
      
      const fetchedAppointments = resApp.data.data.appointments.map(a => ({
        id: a.id,
        patientName: a.patientDetails ? `${a.patientDetails.firstName} ${a.patientDetails.lastName}` : 'Unknown',
        date: new Date(a.appointmentDate).toLocaleDateString(),
        time: new Date(a.appointmentDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        doctorId: a.doctorId || '',
        departmentName: a.departmentDetails ? a.departmentDetails.name : '',
        status: a.status
      }))
      
      setAppointments(fetchedAppointments)
      setDoctors(resDoc.data)
      setDepartments(resDep.data.data.departments)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }


  const handleAssignDoctor = async (appointmentId, doctorId) => {
    if (!doctorId) return
    try {
      const token = localStorage.getItem('accessToken')
      await axios.put(`http://localhost:5900/api/receptionists/patientsrequests/${appointmentId}/assign`, 
        { doctorId: Number(doctorId) }, 
        { headers: { Authorization: `Bearer ${token}` } }
      )
      alert('Doctor assigned successfully!')
      fetchData() // Refresh list
    } catch (error) {
      console.error(error)
      alert(error.response?.data?.message || 'Error assigning doctor')
    }
  }

  const filtered = filter === 'All' ? appointments : appointments.filter((a) => a.status === filter)

  return (
    <div className="dash-layout">
      <Sidebar role="receptionist" />
      <main className="dash-main">
        <div className="dash-header">
          <div>
            <h1 className="dash-title">Incoming Patients</h1>
            <p className="dash-subtitle">Monitor and manage today's patient flow</p>
          </div>
          <div className="dash-avatar" style={{ background: 'linear-gradient(135deg,#f59e0b,#d97706)' }}>R</div>
        </div>

        {/* Filter tabs */}
        <div className="filter-tabs">
          {['All', 'pending', 'confirmed', 'completed', 'cancelled'].map((tab) => (
            <button
              key={tab}
              className={`filter-tab ${filter === tab ? 'filter-tab--active' : ''}`}
              onClick={() => setFilter(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Patient table */}
        <div className="dash-section">
          <div className="table-wrapper">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Department</th>
                  <th>Assign Doctor</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="7" style={{ textAlign: 'center' }}>Loading...</td></tr>
                ) : filtered.map((row, i) => {
                  const availableDocs = doctors.filter(doc => 
                    doc.specialization && doc.specialization.toLowerCase() === row.departmentName.toLowerCase() && doc.status === 'active'
                  );
                  return (
                    <tr key={i}>
                      <td>{row.patientName}</td>
                      <td className="td-muted">{row.date}</td>
                      <td className="td-muted">{row.time}</td>
                      <td className="td-muted">{row.departmentName || 'Unknown'}</td>
                      <td>
                        <select 
                          value={row.doctorId || ''}
                          onChange={(e) => handleAssignDoctor(row.id, e.target.value)}
                          className="auth-input" 
                          style={{ padding: '0.35rem', background: '#13131f', color: '#fff', border: '1px solid #333' }}
                        >
                          <option value="">Select Doctor</option>
                          {availableDocs.map(doc => (
                            <option key={doc.id} value={doc.id}>Dr. {doc.lastName}</option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <span
                          className={`status-badge ${
                            row.status === 'completed'
                              ? 'status-green'
                              : row.status === 'confirmed'
                              ? 'status-purple'
                              : row.status === 'pending'
                              ? 'status-yellow'
                              : 'status-grey'
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

export default IncomingPatients

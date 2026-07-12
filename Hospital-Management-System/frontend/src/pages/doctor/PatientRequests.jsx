import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import axios from 'axios'

const PatientRequests = () => {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [doctorStatus, setDoctorStatus] = useState('loading') // loading | active | blocked

  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const initials = user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'D'

  useEffect(() => {
    checkProfileAndFetch()
  }, [])

  const checkProfileAndFetch = async () => {
    try {
      const token = localStorage.getItem('accessToken')

      // First check doctor's profile status
      const profileRes = await axios.get('http://localhost:5900/api/doctors/my-profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      const doctor = profileRes.data.data.doctor
      if (doctor.status !== 'active') {
        setDoctorStatus('blocked')
        setLoading(false)
        return
      }

      setDoctorStatus('active')

      // Fetch appointments
      const res = await axios.get('http://localhost:5900/api/appointments', {
        headers: { Authorization: `Bearer ${token}` }
      })

      const appointments = res.data.data.appointments
      const mapped = appointments.map(a => ({
        id: a.id,
        patient: a.patientDetails
          ? `${a.patientDetails.firstName} ${a.patientDetails.lastName}`
          : 'Unknown Patient',
        date: new Date(a.appointmentDate).toLocaleDateString(),
        time: new Date(a.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        department: a.departmentDetails ? a.departmentDetails.name : 'General',
        status: a.status
      }))

      setRequests(mapped)
      setLoading(false)
    } catch (err) {
      if (err.response?.status === 404) {
        setDoctorStatus('blocked')
      } else {
        console.error('Error:', err)
      }
      setLoading(false)
    }
  }

  const handleAction = async (id, action) => {
    try {
      const token = localStorage.getItem('accessToken')
      const status = action === 'accept' ? 'confirmed' : 'cancelled'

      await axios.put(`http://localhost:5900/api/appointments/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      checkProfileAndFetch()
    } catch (error) {
      console.error('Error updating request:', error)
      alert('Failed to update request')
    }
  }

  // ─── BLOCKED STATE ───
  if (doctorStatus === 'blocked') {
    return (
      <div className="dash-layout">
        <Sidebar role="doctor" />
        <main className="dash-main">
          <div className="dash-header">
            <div>
              <h1 className="dash-title">Patient Requests</h1>
              <p className="dash-subtitle">Review and respond to incoming requests</p>
            </div>
            <div className="dash-avatar" style={{ background: 'linear-gradient(135deg,#10b981,#059669)' }}>{initials}</div>
          </div>

          <div className="blocked-banner">
            <div className="blocked-banner-icon">🔒</div>
            <div className="blocked-banner-content">
              <h2 className="blocked-banner-title">Access Restricted</h2>
              <p className="blocked-banner-text">
                You cannot manage patient requests until your profile has been approved by the admin.
                Please check your <a href="/doctor/overview" className="blocked-banner-link">Overview</a> page for your profile status.
              </p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="dash-layout">
      <Sidebar role="doctor" />
      <main className="dash-main">
        <div className="dash-header">
          <div>
            <h1 className="dash-title">Patient Requests</h1>
            <p className="dash-subtitle">Review and respond to incoming requests</p>
          </div>
          <div className="dash-avatar" style={{ background: 'linear-gradient(135deg,#10b981,#059669)' }}>{initials}</div>
        </div>

        <div className="dash-section">
          <div className="table-wrapper">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="6" style={{ textAlign: 'center' }}>Loading...</td></tr>
                ) : requests.length === 0 ? (
                  <tr><td colSpan="6" style={{ textAlign: 'center', color: '#64748b' }}>No appointment requests found</td></tr>
                ) : requests.map((row) => (
                  <tr key={row.id}>
                    <td>{row.patient}</td>
                    <td>{row.date}</td>
                    <td className="td-muted">{row.time}</td>
                    <td>{row.department}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          row.status === 'confirmed'
                            ? 'status-green'
                            : row.status === 'cancelled'
                            ? 'status-red'
                            : row.status === 'completed'
                            ? 'status-purple'
                            : 'status-yellow'
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td>
                      {row.status === 'pending' ? (
                        <div className="action-btns">
                          <button
                            className="dash-btn dash-btn--sm dash-btn--accept"
                            onClick={() => handleAction(row.id, 'accept')}
                          >
                            Accept
                          </button>
                          <button
                            className="dash-btn dash-btn--sm dash-btn--danger"
                            onClick={() => handleAction(row.id, 'reject')}
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="td-muted">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

export default PatientRequests

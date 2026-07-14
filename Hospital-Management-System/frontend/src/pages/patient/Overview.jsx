import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import axios from 'axios'

const PatientOverview = () => {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)
  
  // Profile form state
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [profileForm, setProfileForm] = useState({
    firstName: '', lastName: '', phone: '', dateOfBirth: '', gender: 'male',
    bloodGroup: 'O+', address: '', emergencyContactName: '', emergencyContactPhone: '', medicalHistory: ''
  })
  const [profileLoading, setProfileLoading] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      const res = await axios.get('http://localhost:5900/api/appointments', {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      const fetchedAppointments = res.data.data.appointments
      
      const mappedApps = fetchedAppointments.map(a => ({
        id: a.id,
        doctor: a.doctorDetails ? `Dr. ${a.doctorDetails.firstName} ${a.doctorDetails.lastName}` : 'Unknown',
        specialty: a.departmentDetails ? a.departmentDetails.name : 'Unknown',
        date: new Date(a.appointmentDate).toLocaleDateString(),
        time: new Date(a.appointmentDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        status: a.status,
        patientNotified: a.patientNotified
      }))

      setAppointments(mappedApps)

      // Find first unnotified confirmed appointment
      const unnotified = fetchedAppointments.find(a => a.status === 'confirmed' && a.patientNotified === false)
      if (unnotified) {
        setNotification({
          id: unnotified.id,
          doctorName: unnotified.doctorDetails ? `Dr. ${unnotified.doctorDetails.firstName} ${unnotified.doctorDetails.lastName}` : 'Unknown',
          specialty: unnotified.departmentDetails ? unnotified.departmentDetails.name : 'Unknown',
          date: new Date(unnotified.appointmentDate).toLocaleDateString(),
          time: new Date(unnotified.appointmentDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        })
      }

      setLoading(false)
    } catch (error) {
      console.error('Error fetching appointments:', error)
      setLoading(false)
    }
  }

  const handleDismissNotification = async () => {
    if (!notification) return
    try {
      const token = localStorage.getItem('accessToken')
      await axios.put(`http://localhost:5900/api/appointments/${notification.id}/mark-notified`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setNotification(null)
    } catch (error) {
      console.error('Error dismissing notification:', error)
      setNotification(null)
    }
  }

  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    setProfileLoading(true)
    try {
      const token = localStorage.getItem('accessToken')
      await axios.post('http://localhost:5900/api/patients', profileForm, {
        headers: { Authorization: `Bearer ${token}` }
      })
      alert('Profile created successfully!')
      setShowProfileModal(false)
    } catch (error) {
      console.error('Error creating profile:', error)
      alert(error.response?.data?.message || 'Error creating profile')
    } finally {
      setProfileLoading(false)
    }
  }

  const handleProfileChange = (e) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value })
  }

  // Calculate stats
  const totalAppointments = appointments.length
  const confirmed = appointments.filter(a => a.status === 'confirmed').length
  const pending = appointments.filter(a => a.status === 'pending').length

  const statCards = [
    { label: 'Total Appointments', value: totalAppointments.toString(), sub: 'all time', color: '#6358fc' },
    { label: 'Confirmed', value: confirmed.toString(), sub: 'upcoming', color: '#10b981' },
    { label: 'Pending', value: pending.toString(), sub: 'waiting approval', color: '#f59e0b' },
    { label: 'Reports', value: '0', sub: 'available', color: '#ec4899' },
  ]

  const userName = user?.name?.split(' ')[0] || 'User'
  const initials = user?.name ? user.name[0].toUpperCase() : 'U'

  return (
    <div className="dash-layout">
      <Sidebar role="patient" />
      <main className="dash-main">
        {/* Header */}
        <div className="dash-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 className="dash-title">Good morning, {userName} 👋</h1>
            <p className="dash-subtitle">Here's your health summary for today</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button 
              className="dash-btn" 
              style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }} 
              onClick={() => setShowProfileModal(true)}
            >
              Create Profile
            </button>
            <div className="dash-avatar">{initials}</div>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="stat-grid">
          {statCards.map((card) => (
            <div className="stat-card" key={card.label} style={{ '--card-color': card.color }}>
              <div className="stat-card-dot" style={{ background: card.color }} />
              <p className="stat-card-value" style={{ color: card.color }}>{card.value}</p>
              <p className="stat-card-label">{card.label}</p>
              <p className="stat-card-sub">{card.sub}</p>
            </div>
          ))}
        </div>

        {/* Recent Appointments */}
        <div className="dash-section">
          <h2 className="dash-section-title">Your Appointments</h2>
          <div className="table-wrapper">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Doctor</th>
                  <th>Specialty</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="5" style={{ textAlign: 'center' }}>Loading...</td></tr>
                ) : appointments.length === 0 ? (
                  <tr><td colSpan="5" style={{ textAlign: 'center', color: '#64748b' }}>No appointments found</td></tr>
                ) : appointments.slice(0, 5).map((row, i) => (
                  <tr key={i}>
                    <td>{row.doctor}</td>
                    <td className="td-muted">{row.specialty}</td>
                    <td>{row.date}</td>
                    <td className="td-muted">{row.time}</td>
                    <td>
                      <span className={`status-badge ${row.status === 'confirmed' ? 'status-green' : row.status === 'pending' ? 'status-yellow' : 'status-grey'}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create Profile Modal */}
        {showProfileModal && (
          <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '600px', width: '100%', padding: '2rem', background: '#1e1e2d', borderRadius: '12px', color: '#fff', border: '1px solid #333' }}>
              <h2 style={{ marginBottom: '1.5rem' }}>Create Profile</h2>
              <form onSubmit={handleProfileSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="auth-label">First Name *</label>
                  <input required name="firstName" value={profileForm.firstName} onChange={handleProfileChange} type="text" className="auth-input" />
                </div>
                <div>
                  <label className="auth-label">Last Name *</label>
                  <input required name="lastName" value={profileForm.lastName} onChange={handleProfileChange} type="text" className="auth-input" />
                </div>
                <div>
                  <label className="auth-label">Phone *</label>
                  <input required name="phone" value={profileForm.phone} onChange={handleProfileChange} type="tel" className="auth-input" />
                </div>
                <div>
                  <label className="auth-label">Date of Birth *</label>
                  <input required name="dateOfBirth" value={profileForm.dateOfBirth} onChange={handleProfileChange} type="date" className="auth-input" />
                </div>
                <div>
                  <label className="auth-label">Gender *</label>
                  <select required name="gender" value={profileForm.gender} onChange={handleProfileChange} className="auth-input">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="auth-label">Blood Group</label>
                  <select name="bloodGroup" value={profileForm.bloodGroup} onChange={handleProfileChange} className="auth-input">
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <label className="auth-label">Address</label>
                  <input name="address" value={profileForm.address} onChange={handleProfileChange} type="text" className="auth-input" />
                </div>
                <div>
                  <label className="auth-label">Emergency Contact Name</label>
                  <input name="emergencyContactName" value={profileForm.emergencyContactName} onChange={handleProfileChange} type="text" className="auth-input" />
                </div>
                <div>
                  <label className="auth-label">Emergency Contact Phone</label>
                  <input name="emergencyContactPhone" value={profileForm.emergencyContactPhone} onChange={handleProfileChange} type="tel" className="auth-input" />
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <label className="auth-label">Medical History</label>
                  <textarea name="medicalHistory" value={profileForm.medicalHistory} onChange={handleProfileChange} className="auth-input" rows="3"></textarea>
                </div>
                
                <div style={{ gridColumn: 'span 2', display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <button type="button" onClick={() => setShowProfileModal(false)} className="dash-btn" style={{ flex: 1, background: '#333' }}>
                    Cancel
                  </button>
                  <button type="submit" disabled={profileLoading} className="dash-btn" style={{ flex: 1 }}>
                    {profileLoading ? 'Saving...' : 'Save Profile'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Notification Modal */}
        {notification && (
          <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '400px', width: '100%', padding: '2rem', background: '#1e1e2d', borderRadius: '12px', color: '#fff', border: '1px solid #333', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
              <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem', color: '#10b981' }}>Appointment Confirmed!</h2>
              <p style={{ marginBottom: '1.5rem', color: '#9ca3af', lineHeight: '1.5' }}>
                Your appointment has been approved. You will be seeing <strong>{notification.doctorName}</strong> ({notification.specialty}) on <strong>{notification.date}</strong> at <strong>{notification.time}</strong>.
              </p>
              <button 
                className="dash-btn" 
                style={{ width: '100%', background: 'linear-gradient(135deg, #10b981, #059669)' }} 
                onClick={handleDismissNotification}
              >
                Got it, thanks!
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default PatientOverview

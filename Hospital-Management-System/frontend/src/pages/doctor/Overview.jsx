import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import axios from 'axios'

const DoctorOverview = () => {
  const [profileState, setProfileState] = useState('loading') // loading | no_profile | pending | active
  const [doctorProfile, setDoctorProfile] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const user = JSON.parse(localStorage.getItem('user') || '{}')

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user.email || '',
    phone: '',
    specialization: '',
    qualification: '',
    experienceYears: '',
    licenseNumber: '',
    gender: '',
    dateOfBirth: '',
    address: '',
    consultationFee: ''
  })

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      const res = await axios.get('http://localhost:5900/api/doctors/my-profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
      const doctor = res.data.data.doctor
      setDoctorProfile(doctor)
      setProfileState(doctor.status === 'active' ? 'active' : 'pending')
    } catch (err) {
      if (err.response?.status === 404) {
        setProfileState('no_profile')
      } else {
        console.error('Error fetching profile:', err)
        setProfileState('no_profile')
      }
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const token = localStorage.getItem('accessToken')
      await axios.post('http://localhost:5900/api/doctors', {
        ...formData,
        experienceYears: Number(formData.experienceYears) || 0,
        consultationFee: Number(formData.consultationFee) || 0
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setProfileState('pending')
      fetchProfile()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit profile')
    } finally {
      setSubmitting(false)
    }
  }

  const initials = user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'D'

  // ─── LOADING STATE ───
  if (profileState === 'loading') {
    return (
      <div className="dash-layout">
        <Sidebar role="doctor" />
        <main className="dash-main">
          <div className="dash-header">
            <div>
              <h1 className="dash-title">Doctor Dashboard</h1>
              <p className="dash-subtitle">Loading your profile...</p>
            </div>
            <div className="dash-avatar">{initials}</div>
          </div>
          <div className="doctor-loading">
            <div className="doctor-loading-spinner"></div>
            <p>Loading profile...</p>
          </div>
        </main>
      </div>
    )
  }

  // ─── PENDING APPROVAL STATE ───
  if (profileState === 'pending') {
    return (
      <div className="dash-layout">
        <Sidebar role="doctor" />
        <main className="dash-main">
          <div className="dash-header">
            <div>
              <h1 className="dash-title">Welcome, Dr. {doctorProfile?.firstName || user.name} 👨‍⚕️</h1>
              <p className="dash-subtitle">Your profile is under review</p>
            </div>
            <div className="dash-avatar" style={{ background: 'linear-gradient(135deg,#f59e0b,#d97706)' }}>{initials}</div>
          </div>

          <div className="pending-banner">
            <div className="pending-banner-icon">⏳</div>
            <div className="pending-banner-content">
              <h2 className="pending-banner-title">Profile Pending Approval</h2>
              <p className="pending-banner-text">
                Your profile has been submitted and is currently being reviewed by the admin. 
                You will be able to manage patient requests once your profile is approved.
              </p>
            </div>
          </div>

          {doctorProfile && (
            <div className="dash-section">
              <h2 className="dash-section-title">Submitted Profile Details</h2>
              <div className="profile-summary">
                <div className="profile-summary-row">
                  <span className="profile-summary-label">Name</span>
                  <span className="profile-summary-value">Dr. {doctorProfile.firstName} {doctorProfile.lastName}</span>
                </div>
                <div className="profile-summary-row">
                  <span className="profile-summary-label">Email</span>
                  <span className="profile-summary-value">{doctorProfile.email}</span>
                </div>
                <div className="profile-summary-row">
                  <span className="profile-summary-label">Phone</span>
                  <span className="profile-summary-value">{doctorProfile.phone}</span>
                </div>
                <div className="profile-summary-row">
                  <span className="profile-summary-label">Specialization</span>
                  <span className="profile-summary-value">{doctorProfile.specialization}</span>
                </div>
                <div className="profile-summary-row">
                  <span className="profile-summary-label">Qualification</span>
                  <span className="profile-summary-value">{doctorProfile.qualification}</span>
                </div>
                <div className="profile-summary-row">
                  <span className="profile-summary-label">License Number</span>
                  <span className="profile-summary-value">{doctorProfile.licenseNumber}</span>
                </div>
                <div className="profile-summary-row">
                  <span className="profile-summary-label">Experience</span>
                  <span className="profile-summary-value">{doctorProfile.experienceYears} years</span>
                </div>
                <div className="profile-summary-row">
                  <span className="profile-summary-label">Status</span>
                  <span className="status-badge status-yellow">Pending Approval</span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    )
  }

  // ─── NO PROFILE — SHOW FORM ───
  if (profileState === 'no_profile') {
    return (
      <div className="dash-layout">
        <Sidebar role="doctor" />
        <main className="dash-main">
          <div className="dash-header">
            <div>
              <h1 className="dash-title">Complete Your Profile 👨‍⚕️</h1>
              <p className="dash-subtitle">Fill in your details to get started. Your profile will be reviewed by the admin.</p>
            </div>
            <div className="dash-avatar" style={{ background: 'linear-gradient(135deg,#10b981,#059669)' }}>{initials}</div>
          </div>

          {error && <div className="doctor-form-error">{error}</div>}

          <div className="dash-section">
            <form className="doctor-profile-form" onSubmit={handleSubmit}>
              {/* Personal Information */}
              <h3 className="doctor-form-section-title">Personal Information</h3>
              <div className="doctor-form-grid">
                <div className="doctor-form-field">
                  <label className="doctor-form-label">First Name *</label>
                  <input
                    className="doctor-form-input"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    required
                  />
                </div>
                <div className="doctor-form-field">
                  <label className="doctor-form-label">Last Name *</label>
                  <input
                    className="doctor-form-input"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    required
                  />
                </div>
                <div className="doctor-form-field">
                  <label className="doctor-form-label">Email</label>
                  <input
                    className="doctor-form-input doctor-form-input--disabled"
                    type="email"
                    name="email"
                    value={formData.email}
                    readOnly
                  />
                </div>
                <div className="doctor-form-field">
                  <label className="doctor-form-label">Phone *</label>
                  <input
                    className="doctor-form-input"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+977 98XXXXXXXX"
                    required
                  />
                </div>
                <div className="doctor-form-field">
                  <label className="doctor-form-label">Gender *</label>
                  <select
                    className="doctor-form-input doctor-form-select"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="doctor-form-field">
                  <label className="doctor-form-label">Date of Birth</label>
                  <input
                    className="doctor-form-input"
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Professional Information */}
              <h3 className="doctor-form-section-title">Professional Information</h3>
              <div className="doctor-form-grid">
                <div className="doctor-form-field">
                  <label className="doctor-form-label">Specialization *</label>
                  <input
                    className="doctor-form-input"
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    placeholder="e.g. Cardiologist, Neurologist"
                    required
                  />
                </div>
                <div className="doctor-form-field">
                  <label className="doctor-form-label">Qualification *</label>
                  <input
                    className="doctor-form-input"
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    placeholder="e.g. MBBS, MD"
                    required
                  />
                </div>
                <div className="doctor-form-field">
                  <label className="doctor-form-label">License Number (NMC) *</label>
                  <input
                    className="doctor-form-input"
                    type="text"
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    placeholder="e.g. NMC-12345"
                    required
                  />
                </div>
                <div className="doctor-form-field">
                  <label className="doctor-form-label">Experience (Years)</label>
                  <input
                    className="doctor-form-input"
                    type="number"
                    name="experienceYears"
                    value={formData.experienceYears}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                  />
                </div>
                <div className="doctor-form-field">
                  <label className="doctor-form-label">Consultation Fee (NPR)</label>
                  <input
                    className="doctor-form-input"
                    type="number"
                    name="consultationFee"
                    value={formData.consultationFee}
                    onChange={handleChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="doctor-form-field doctor-form-field--full">
                  <label className="doctor-form-label">Address</label>
                  <textarea
                    className="doctor-form-input doctor-form-textarea"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your clinic/hospital address"
                    rows="3"
                  />
                </div>
              </div>

              <div className="doctor-form-actions">
                <button type="submit" className="dash-btn doctor-form-submit" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit Profile for Approval'}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    )
  }

  // ─── ACTIVE (APPROVED) — SHOW DASHBOARD ───
  const statCards = [
    { label: 'Total Patients', value: '24', sub: 'this week', color: '#10b981' },
    { label: 'Pending Requests', value: '5', sub: 'awaiting', color: '#f59e0b' },
    { label: 'Completed', value: '19', sub: 'this week', color: '#6358fc' },
    { label: 'Avg. Rating', value: '4.8', sub: 'out of 5', color: '#ec4899' },
  ]

  const todaySchedule = [
    { time: '9:00 AM', patient: 'Alice Johnson', reason: 'Chest pain follow-up' },
    { time: '10:30 AM', patient: 'Bob Martin', reason: 'Routine checkup' },
    { time: '12:00 PM', patient: 'Carol White', reason: 'ECG review' },
    { time: '3:00 PM', patient: 'David Brown', reason: 'Post-surgery consult' },
  ]

  return (
    <div className="dash-layout">
      <Sidebar role="doctor" />
      <main className="dash-main">
        <div className="dash-header">
          <div>
            <h1 className="dash-title">Welcome, Dr. {doctorProfile?.firstName || 'Doctor'} 👨‍⚕️</h1>
            <p className="dash-subtitle">You have 5 pending patient requests today</p>
          </div>
          <div className="dash-avatar" style={{ background: 'linear-gradient(135deg,#10b981,#059669)' }}>{initials}</div>
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

        {/* Today's Schedule */}
        <div className="dash-section">
          <h2 className="dash-section-title">Today's Schedule</h2>
          <div className="table-wrapper">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Patient</th>
                  <th>Reason</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {todaySchedule.map((row, i) => (
                  <tr key={i}>
                    <td><span className="time-badge">{row.time}</span></td>
                    <td>{row.patient}</td>
                    <td className="td-muted">{row.reason}</td>
                    <td>
                      <button className="dash-btn dash-btn--sm">View</button>
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

export default DoctorOverview

import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import axios from 'axios'

const IncomingPatients = () => {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      const res = await axios.get('http://localhost:5900/api/appointments', { 
        headers: { Authorization: `Bearer ${token}` } 
      })
      
      const fetchedAppointments = res.data.data.appointments.map(a => ({
        id: a.id,
        patientName: a.patientDetails ? `${a.patientDetails.firstName} ${a.patientDetails.lastName}` : 'Unknown',
        date: new Date(a.appointmentDate).toLocaleDateString(),
        time: new Date(a.appointmentDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        doctor: a.doctorDetails ? `Dr. ${a.doctorDetails.lastName}` : 'Unknown',
        status: a.status
      }))
      
      setAppointments(fetchedAppointments)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (appointmentId, newStatus) => {
    if (!newStatus) return
    try {
      const token = localStorage.getItem('accessToken')
      await axios.put(`http://localhost:5900/api/appointments/${appointmentId}/status`, 
        { status: newStatus }, 
        { headers: { Authorization: `Bearer ${token}` } }
      )
      fetchData() // Refresh list
    } catch (error) {
      console.error(error)
      alert('Error updating status')
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
                  <th>Doctor</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="6" style={{ textAlign: 'center' }}>Loading...</td></tr>
                ) : filtered.map((row, i) => (
                  <tr key={i}>
                    <td>{row.patientName}</td>
                    <td className="td-muted">{row.date}</td>
                    <td className="td-muted">{row.time}</td>
                    <td>{row.doctor}</td>
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
                    <td>
                      <select 
                        value={row.status}
                        onChange={(e) => handleUpdateStatus(row.id, e.target.value)}
                        className="auth-input" 
                        style={{ padding: '0.35rem', background: '#13131f', color: '#fff', border: '1px solid #333' }}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
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

export default IncomingPatients

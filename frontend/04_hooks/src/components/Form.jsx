import React, { useState } from 'react'

const Form = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '' })
    const [isSubmitted, setSubmitted] = useState(false)

    return (
        <div>
            <h1>Register Form</h1>

            <input type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="name"
            />
            <input type="text"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="email"
            />
            <input type="text"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="password"
            />
            {/* <input type="text" /> */}
            <p>{form.name} you're registered successfully🎉🎉</p>
        </div>
    )
}

export default Form
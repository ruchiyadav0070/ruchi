import React, { useState } from 'react'
import { jsPDF } from 'jspdf'

function ResumeForm() {
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', linkedin: '', github: '',
    summary: '', experience: '', education: '', skills: '',
    projects: '', certifications: '', languages: '', hobbies: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const doc = new jsPDF()
    let content = ''
    for (const [key, value] of Object.entries(formData)) {
      if (value.trim() !== '') {
        content += `${key.toUpperCase()}:\n${value}\n\n`
      }
    }
    const lines = doc.splitTextToSize(content, 180)
    doc.text(lines, 10, 10)
    doc.save('ATS-Friendly-Resume.pdf')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>🧑 Personal Information</h2>
      <input name="name" placeholder="Full Name" onChange={handleChange} required />
      <input name="phone" placeholder="Phone Number" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="linkedin" placeholder="LinkedIn URL" onChange={handleChange} />
      <input name="github" placeholder="GitHub URL" onChange={handleChange} />

      <h2>📝 Summary</h2>
      <textarea name="summary" rows="4" placeholder="Professional Summary" onChange={handleChange}></textarea>

      <h2>💼 Experience</h2>
      <textarea name="experience" rows="5" placeholder="Company, Role, Duration, Responsibilities" onChange={handleChange}></textarea>

      <h2>🎓 Education</h2>
      <textarea name="education" rows="4" placeholder="College, Degree, Year, CGPA" onChange={handleChange}></textarea>

      <h2>🛠️ Skills</h2>
      <input name="skills" placeholder="Java, HTML, SQL, React" onChange={handleChange} />

      <h2>📁 Projects</h2>
      <textarea name="projects" rows="4" placeholder="Project Name, Tech Used, Description" onChange={handleChange}></textarea>

      <h2>🏅 Certifications</h2>
      <textarea name="certifications" rows="3" placeholder="Course, Platform, Year" onChange={handleChange}></textarea>

      <h2>🌐 Languages</h2>
      <input name="languages" placeholder="English, Hindi" onChange={handleChange} />

      <h2>🎯 Hobbies</h2>
      <input name="hobbies" placeholder="Reading, Coding" onChange={handleChange} />

      <button type="submit">Generate ATS PDF</button>
    </form>
  )
}

export default ResumeForm

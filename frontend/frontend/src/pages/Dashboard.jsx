import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import ProjectCard from '../components/ProjectCard'
import CreateProjectModal from '../components/CreateProjectModal'

const API_URL = 'http://localhost:3000/api'

const Dashboard = () => {

  const [projects, setProjects]   = useState([])
  const [showModal, setShowModal] = useState(false)

  const loadProjects = () => {
    axios.get(`${API_URL}/projects`, { withCredentials:true })
      .then((response) => {
        if (response.data.status === 'success') {
          setProjects(response.data.projects)
        }
      })
      .catch((error) => console.error('Error loading projects', error))
  }

  useEffect(() => {
    loadProjects()
  }, [])

  return (
    <div style={{ minHeight:'100vh', backgroundColor:'#111', color:'white' }}>
      <Navbar />

      <div style={{ padding:'30px' }}>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'30px' }}>
          <h2 style={{ margin:0 }}>My Projects</h2>
          <button
            onClick={() => setShowModal(true)}
            style={{ padding:'10px 20px', backgroundColor:'#3b82f6', color:'white', border:'none', borderRadius:'8px', cursor:'pointer', fontWeight:'bold' }}
          >
            + New Project
          </button>
        </div>

        {projects.length === 0 ? (
          <p style={{ color:'#aaa', textAlign:'center' }}>No projects yet. Create one!</p>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'20px' }}>
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
              />
            ))}
          </div>
        )}

      </div>

      {showModal && (
        <CreateProjectModal
          onClose={() => setShowModal(false)}
          onCreated={loadProjects}
        />
      )}

    </div>
  )
}

export default Dashboard
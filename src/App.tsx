import { useState } from 'react'
import ApplicationForm from './components/ApplicationForm'
import StatCard from './components/StatCard'
import { applications as initialApplications } from './data/applications'
import type { JobApplication } from './types/application'

function App() {
  const [applications, setApplications] = useState(initialApplications)
  const [showForm, setShowForm] = useState(false)
  const appliedCount = applications.filter((job) => job.status === 'Applied').length
  const interviewCount = applications.filter((job) => job.status === 'Interview').length

  const addApplication = (application: JobApplication) => {
    setApplications((current) => [application, ...current])
    setShowForm(false)
  }

  return (
    <main className="page-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">Job search dashboard</p>
          <h1>JobFlow</h1>
          <p className="subtitle">Keep applications, interviews and follow-ups in one place.</p>
        </div>
        <button type="button" onClick={() => setShowForm(true)}>Add application</button>
      </header>

      {showForm && <ApplicationForm onAdd={addApplication} onCancel={() => setShowForm(false)} />}

      <section className="stats-grid" aria-label="Application summary">
        <StatCard label="Total applications" value={applications.length} />
        <StatCard label="Applied" value={appliedCount} />
        <StatCard label="Interviews" value={interviewCount} />
      </section>

      <section className="applications-panel">
        <div className="section-heading">
          <div>
            <h2>Applications</h2>
            <p>Your most recent roles.</p>
          </div>
        </div>

        <div className="application-list">
          {applications.map((job) => (
            <article className="application-row" key={job.id}>
              <div>
                <h3>{job.role}</h3>
                <p>{job.company} · {job.location}</p>
              </div>
              <span className="status-badge">{job.status}</span>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App

import { useMemo, useState } from 'react'
import ApplicationDetails from './components/ApplicationDetails'
import ApplicationForm from './components/ApplicationForm'
import FollowUpList from './components/FollowUpList'
import StatCard from './components/StatCard'
import { applications as initialApplications } from './data/applications'
import type { ApplicationStatus, JobApplication } from './types/application'

const statusOptions: Array<ApplicationStatus | 'All'> = ['All', 'Wishlist', 'Applied', 'Interview', 'Offer', 'Closed']

function App() {
  const [applications, setApplications] = useState(initialApplications)
  const [showForm, setShowForm] = useState(false)
  const [editingApplication, setEditingApplication] = useState<JobApplication | null>(null)
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'All'>('All')
  const appliedCount = applications.filter((job) => job.status === 'Applied').length
  const interviewCount = applications.filter((job) => job.status === 'Interview').length

  const visibleApplications = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    return applications.filter((job) => {
      const matchesSearch = !query || [job.role, job.company, job.location].some((value) => value.toLowerCase().includes(query))
      const matchesStatus = statusFilter === 'All' || job.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [applications, searchTerm, statusFilter])

  const openAddForm = () => { setEditingApplication(null); setSelectedApplication(null); setShowForm(true) }
  const openEditForm = (application: JobApplication) => { setEditingApplication(application); setSelectedApplication(null); setShowForm(true) }
  const closeForm = () => { setEditingApplication(null); setShowForm(false) }
  const saveApplication = (application: JobApplication) => {
    setApplications((current) => current.some((job) => job.id === application.id) ? current.map((job) => job.id === application.id ? application : job) : [application, ...current])
    closeForm()
  }
  const deleteApplication = (id: string) => {
    setApplications((current) => current.filter((job) => job.id !== id))
    if (selectedApplication?.id === id) setSelectedApplication(null)
  }

  return (
    <main className="page-shell">
      <header className="page-header">
        <div><p className="eyebrow">Job search dashboard</p><h1>JobFlow</h1><p className="subtitle">Keep applications, interviews and follow-ups in one place.</p></div>
        <button type="button" onClick={openAddForm}>Add application</button>
      </header>

      {showForm && <ApplicationForm application={editingApplication ?? undefined} onSave={saveApplication} onCancel={closeForm} />}
      {selectedApplication && !showForm && <ApplicationDetails application={selectedApplication} onClose={() => setSelectedApplication(null)} onEdit={openEditForm} />}

      <section className="stats-grid" aria-label="Application summary">
        <StatCard label="Total applications" value={applications.length} />
        <StatCard label="Applied" value={appliedCount} />
        <StatCard label="Interviews" value={interviewCount} />
      </section>

      <FollowUpList applications={applications} onSelect={setSelectedApplication} />

      <section className="applications-panel">
        <div className="section-heading">
          <div><h2>Applications</h2><p>Your most recent roles.</p></div>
          <div className="application-filters">
            <label className="search-field"><span className="sr-only">Search applications</span><input type="search" placeholder="Search company, role or location" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} /></label>
            <label><span className="sr-only">Filter by status</span><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as ApplicationStatus | 'All')}>{statusOptions.map((status) => <option key={status}>{status}</option>)}</select></label>
          </div>
        </div>
        <div className="application-list">
          {visibleApplications.length > 0 ? visibleApplications.map((job) => (
            <article className="application-row" key={job.id}>
              <button className="application-main" type="button" onClick={() => setSelectedApplication(job)}><span><strong>{job.role}</strong><small>{job.company} · {job.location}</small></span></button>
              <div className="application-actions"><span className="status-badge">{job.status}</span><button className="text-button" type="button" onClick={() => openEditForm(job)}>Edit</button><button className="delete-button" type="button" onClick={() => deleteApplication(job.id)}>Delete</button></div>
            </article>
          )) : <p className="empty-state">No applications match these filters.</p>}
        </div>
      </section>
    </main>
  )
}

export default App

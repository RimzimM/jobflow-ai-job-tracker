import { FormEvent, useState } from 'react'
import type { ApplicationStatus, JobApplication } from '../types/application'

type ApplicationFormProps = {
  onAdd: (application: JobApplication) => void
  onCancel: () => void
}

const statuses: ApplicationStatus[] = ['Wishlist', 'Applied', 'Interview', 'Offer', 'Closed']

function ApplicationForm({ onAdd, onCancel }: ApplicationFormProps) {
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [location, setLocation] = useState('')
  const [status, setStatus] = useState<ApplicationStatus>('Wishlist')
  const [error, setError] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!company.trim() || !role.trim()) {
      setError('Company and role are required.')
      return
    }

    onAdd({
      id: crypto.randomUUID(),
      company: company.trim(),
      role: role.trim(),
      location: location.trim() || 'Not specified',
      status,
      appliedAt: status === 'Wishlist' ? undefined : new Date().toISOString().slice(0, 10),
    })
  }

  return (
    <form className="application-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <div>
          <h2>Add application</h2>
          <p>Save a role to your job search.</p>
        </div>
        <button className="text-button" type="button" onClick={onCancel}>Cancel</button>
      </div>

      <div className="form-grid">
        <label>
          Company
          <input value={company} onChange={(event) => setCompany(event.target.value)} placeholder="Acme" />
        </label>
        <label>
          Role
          <input value={role} onChange={(event) => setRole(event.target.value)} placeholder="Frontend Developer" />
        </label>
        <label>
          Location
          <input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Vancouver, BC" />
        </label>
        <label>
          Status
          <select value={status} onChange={(event) => setStatus(event.target.value as ApplicationStatus)}>
            {statuses.map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>
      </div>

      {error && <p className="form-error" role="alert">{error}</p>}
      <button type="submit">Save application</button>
    </form>
  )
}

export default ApplicationForm

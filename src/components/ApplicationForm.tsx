import { FormEvent, useState } from 'react'
import type { ApplicationStatus, JobApplication } from '../types/application'

type ApplicationFormProps = {
  application?: JobApplication
  onSave: (application: JobApplication) => void
  onCancel: () => void
}

const statuses: ApplicationStatus[] = ['Wishlist', 'Applied', 'Interview', 'Offer', 'Closed']

function ApplicationForm({ application, onSave, onCancel }: ApplicationFormProps) {
  const [company, setCompany] = useState(application?.company ?? '')
  const [role, setRole] = useState(application?.role ?? '')
  const [location, setLocation] = useState(application?.location === 'Not specified' ? '' : application?.location ?? '')
  const [status, setStatus] = useState<ApplicationStatus>(application?.status ?? 'Wishlist')
  const [jobUrl, setJobUrl] = useState(application?.jobUrl ?? '')
  const [source, setSource] = useState(application?.source ?? '')
  const [contactName, setContactName] = useState(application?.contactName ?? '')
  const [contactEmail, setContactEmail] = useState(application?.contactEmail ?? '')
  const [followUpAt, setFollowUpAt] = useState(application?.followUpAt ?? '')
  const [notes, setNotes] = useState(application?.notes ?? '')
  const [error, setError] = useState('')
  const isEditing = Boolean(application)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!company.trim() || !role.trim()) {
      setError('Company and role are required.')
      return
    }

    onSave({
      id: application?.id ?? crypto.randomUUID(),
      company: company.trim(),
      role: role.trim(),
      location: location.trim() || 'Not specified',
      status,
      appliedAt: application?.appliedAt ?? (status === 'Wishlist' ? undefined : new Date().toISOString().slice(0, 10)),
      jobUrl: jobUrl.trim() || undefined,
      source: source.trim() || undefined,
      contactName: contactName.trim() || undefined,
      contactEmail: contactEmail.trim() || undefined,
      followUpAt: followUpAt || undefined,
      notes: notes.trim() || undefined,
    })
  }

  return (
    <form className="application-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <div>
          <h2>{isEditing ? 'Edit application' : 'Add application'}</h2>
          <p>{isEditing ? 'Update the details for this role.' : 'Save a role to your job search.'}</p>
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
        <label>
          Job link
          <input type="url" value={jobUrl} onChange={(event) => setJobUrl(event.target.value)} placeholder="https://..." />
        </label>
        <label>
          Source
          <input value={source} onChange={(event) => setSource(event.target.value)} placeholder="LinkedIn, referral..." />
        </label>
        <label>
          Contact
          <input value={contactName} onChange={(event) => setContactName(event.target.value)} placeholder="Recruiter name" />
        </label>
        <label>
          Contact email
          <input type="email" value={contactEmail} onChange={(event) => setContactEmail(event.target.value)} placeholder="name@company.com" />
        </label>
        <label>
          Follow up
          <input type="date" value={followUpAt} onChange={(event) => setFollowUpAt(event.target.value)} />
        </label>
        <label className="form-notes">
          Notes
          <textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Interview notes, reminders, role details..." rows={4} />
        </label>
      </div>

      {error && <p className="form-error" role="alert">{error}</p>}
      <button type="submit">{isEditing ? 'Save changes' : 'Save application'}</button>
    </form>
  )
}

export default ApplicationForm

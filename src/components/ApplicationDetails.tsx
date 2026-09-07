import type { JobApplication } from '../types/application'

type ApplicationDetailsProps = {
  application: JobApplication
  onClose: () => void
  onEdit: (application: JobApplication) => void
}

function ApplicationDetails({ application, onClose, onEdit }: ApplicationDetailsProps) {
  return (
    <section className="details-panel" aria-labelledby="application-details-title">
      <div className="details-header">
        <div>
          <p className="eyebrow">Application details</p>
          <h2 id="application-details-title">{application.role}</h2>
          <p>{application.company} · {application.location}</p>
        </div>
        <button className="text-button" type="button" onClick={onClose}>Close</button>
      </div>

      <div className="details-grid">
        <div><span>Status</span><strong>{application.status}</strong></div>
        <div><span>Applied</span><strong>{application.appliedAt ?? 'Not yet'}</strong></div>
        <div><span>Source</span><strong>{application.source ?? 'Not added'}</strong></div>
        <div><span>Follow up</span><strong>{application.followUpAt ?? 'Not scheduled'}</strong></div>
      </div>

      {(application.contactName || application.contactEmail) && (
        <div className="details-section">
          <h3>Contact</h3>
          <p>{application.contactName ?? 'Recruiter'}{application.contactEmail ? ` · ${application.contactEmail}` : ''}</p>
        </div>
      )}

      {application.notes && (
        <div className="details-section">
          <h3>Notes</h3>
          <p>{application.notes}</p>
        </div>
      )}

      <div className="details-actions">
        {application.jobUrl && <a href={application.jobUrl} target="_blank" rel="noreferrer">Open job posting</a>}
        <button type="button" onClick={() => onEdit(application)}>Edit application</button>
      </div>
    </section>
  )
}

export default ApplicationDetails

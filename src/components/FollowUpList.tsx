import type { JobApplication } from '../types/application'

type Props = {
  applications: JobApplication[]
  onSelect: (application: JobApplication) => void
}

function FollowUpList({ applications, onSelect }: Props) {
  const today = new Date().toISOString().slice(0, 10)
  const followUps = applications
    .filter((job) => job.followUpAt && job.status !== 'Closed')
    .sort((a, b) => (a.followUpAt ?? '').localeCompare(b.followUpAt ?? ''))
    .slice(0, 4)

  if (!followUps.length) return null

  return (
    <section className="follow-up-panel">
      <div className="section-heading">
        <div><h2>Follow-ups</h2><p>Keep the conversations moving.</p></div>
      </div>
      <div className="follow-up-list">
        {followUps.map((job) => {
          const isDue = (job.followUpAt ?? '') <= today
          return (
            <button className="follow-up-row" type="button" key={job.id} onClick={() => onSelect(job)}>
              <span><strong>{job.company}</strong><small>{job.role}</small></span>
              <span className={isDue ? 'follow-up-date due' : 'follow-up-date'}>{isDue ? 'Due ' : ''}{job.followUpAt}</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default FollowUpList

import type { ApplicationStatus, JobApplication } from '../types/application'

type ApplicationInsightsProps = {
  applications: JobApplication[]
}

const trackedStatuses: ApplicationStatus[] = ['Wishlist', 'Applied', 'Interview', 'Offer', 'Closed']

function ApplicationInsights({ applications }: ApplicationInsightsProps) {
  const activeApplications = applications.filter((job) => !['Wishlist', 'Closed'].includes(job.status))
  const interviewCount = applications.filter((job) => job.status === 'Interview').length
  const offerCount = applications.filter((job) => job.status === 'Offer').length
  const responseRate = activeApplications.length > 0
    ? Math.round(((interviewCount + offerCount) / activeApplications.length) * 100)
    : 0

  const sourceCounts = applications.reduce<Record<string, number>>((counts, job) => {
    const source = job.source?.trim() || 'Not specified'
    counts[source] = (counts[source] ?? 0) + 1
    return counts
  }, {})

  const topSource = Object.entries(sourceCounts).sort((a, b) => b[1] - a[1])[0]

  const currentMonth = new Date().toISOString().slice(0, 7)
  const applicationsThisMonth = applications.filter((job) => job.dateApplied?.startsWith(currentMonth)).length

  const statusCounts = trackedStatuses.map((status) => ({
    status,
    count: applications.filter((job) => job.status === status).length,
  }))

  return (
    <section className="insights-panel" aria-labelledby="insights-title">
      <div className="section-heading">
        <div>
          <h2 id="insights-title">Job search insights</h2>
          <p>A quick look at how your applications are moving.</p>
        </div>
      </div>

      <div className="insights-grid">
        <div className="insight-card">
          <span>Response rate</span>
          <strong>{responseRate}%</strong>
          <small>Interviews and offers from active applications</small>
        </div>
        <div className="insight-card">
          <span>Top source</span>
          <strong>{topSource?.[0] ?? '—'}</strong>
          <small>{topSource ? `${topSource[1]} application${topSource[1] === 1 ? '' : 's'}` : 'Add a source to your applications'}</small>
        </div>
        <div className="insight-card">
          <span>Applied this month</span>
          <strong>{applicationsThisMonth}</strong>
          <small>Applications submitted in the current month</small>
        </div>
      </div>

      <div className="status-breakdown" aria-label="Applications by status">
        <h3>Pipeline breakdown</h3>
        <div className="status-breakdown-list">
          {statusCounts.map(({ status, count }) => {
            const percentage = applications.length > 0 ? Math.round((count / applications.length) * 100) : 0
            return (
              <div className="status-breakdown-row" key={status}>
                <div className="status-breakdown-label">
                  <span>{status}</span>
                  <strong>{count}</strong>
                </div>
                <div className="status-track" aria-label={`${status}: ${count} applications`}>
                  <span style={{ width: `${percentage}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ApplicationInsights

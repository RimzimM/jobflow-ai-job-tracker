import type { JobApplication } from '../types/application'

type ApplicationInsightsProps = {
  applications: JobApplication[]
}

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
      </div>
    </section>
  )
}

export default ApplicationInsights

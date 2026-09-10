import { useMemo, useState } from 'react'

const trackedSkills = [
  ['react', 'React'],
  ['typescript', 'TypeScript'],
  ['javascript', 'JavaScript'],
  ['redux', 'Redux'],
  ['vue', 'Vue.js'],
  ['html', 'HTML'],
  ['css', 'CSS'],
  ['accessibility', 'Accessibility'],
  ['responsive', 'Responsive UI'],
  ['git', 'Git'],
] as const

const profileSkills = new Set(['react', 'typescript', 'javascript', 'redux', 'vue', 'html', 'css', 'accessibility', 'responsive', 'git'])

function JobMatchAnalyzer() {
  const [description, setDescription] = useState('')

  const analysis = useMemo(() => {
    const text = description.toLowerCase()
    const mentioned = trackedSkills.filter(([keyword]) => text.includes(keyword))
    const matched = mentioned.filter(([keyword]) => profileSkills.has(keyword))
    const missing = mentioned.filter(([keyword]) => !profileSkills.has(keyword))
    const score = mentioned.length ? Math.round((matched.length / mentioned.length) * 100) : 0

    return { mentioned, matched, missing, score }
  }, [description])

  return (
    <section className="match-analyzer" aria-labelledby="match-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Job match</p>
          <h2 id="match-heading">Check a job description</h2>
          <p>Paste a posting to quickly spot skills that line up with your frontend toolkit.</p>
        </div>
      </div>

      <textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Paste a job description here..."
        rows={7}
        aria-label="Job description"
      />

      {description.trim() && (
        <div className="match-results">
          <div className="match-score">
            <strong>{analysis.score}%</strong>
            <span>tracked skill match</span>
          </div>
          <div className="match-feedback">
            <div>
              <h3>Skills found</h3>
              {analysis.matched.length ? (
                <div className="skill-tags">
                  {analysis.matched.map(([, label]) => <span key={label}>{label}</span>)}
                </div>
              ) : (
                <p>No tracked frontend skills found yet. Try pasting the full posting.</p>
              )}
            </div>
            {analysis.mentioned.length > 0 && (
              <p className="match-note">
                {analysis.missing.length === 0
                  ? 'The tracked requirements in this posting align with your current frontend skill set.'
                  : `${analysis.missing.length} tracked requirement${analysis.missing.length === 1 ? '' : 's'} may need more review.`}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default JobMatchAnalyzer

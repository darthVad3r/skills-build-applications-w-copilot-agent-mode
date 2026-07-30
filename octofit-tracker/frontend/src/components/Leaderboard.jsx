import { useCollection } from '../api'

function Leaderboard() {
  const { endpoint, error, items: leaderboard, status } = useCollection('leaderboard')

  return (
    <section className="content-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Competition</p>
          <h1>Leaderboard</h1>
        </div>
        <span className="endpoint-label">{endpoint}</span>
      </div>

      {status === 'loading' && <p className="state-text">Loading leaderboard...</p>}
      {status === 'error' && <p className="alert alert-warning mb-0">{error}</p>}

      {status === 'success' && (
        <div className="leaderboard-list">
          {leaderboard.map((entry) => (
            <article className="leaderboard-row" key={entry._id ?? entry.rank}>
              <span className="rank-badge">#{entry.rank}</span>
              <div>
                <h2>{entry.userName}</h2>
                <p>{entry.teamName}</p>
              </div>
              <div className="score-block">
                <strong>{entry.points}</strong>
                <span>{entry.activityMinutes} min</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Leaderboard

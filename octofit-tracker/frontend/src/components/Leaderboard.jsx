import { API_BASE_URL, useCollection } from '../api'

const endpoint = `${API_BASE_URL}/api/leaderboard/`;

function Leaderboard() {
  const { endpoint: resolvedEndpoint, error, items: leaderboard, status } = useCollection('leaderboard', endpoint)

  return (
    <section className="content-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Competition</p>
          <h1>Leaderboard</h1>
        </div>
        <span className="endpoint-label">{resolvedEndpoint}</span>
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

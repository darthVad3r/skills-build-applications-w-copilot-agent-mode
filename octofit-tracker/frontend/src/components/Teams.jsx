import { useCollection } from '../api'

function Teams() {
  const { endpoint, error, items: teams, status } = useCollection('teams')

  return (
    <section className="content-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Groups</p>
          <h1>Teams</h1>
        </div>
        <span className="endpoint-label">{endpoint}</span>
      </div>

      {status === 'loading' && <p className="state-text">Loading teams...</p>}
      {status === 'error' && <p className="alert alert-warning mb-0">{error}</p>}

      {status === 'success' && (
        <div className="row g-3">
          {teams.map((team) => (
            <div className="col-md-6 col-xl-4" key={team._id ?? team.name}>
              <article className="data-card h-100">
                <h2>{team.name}</h2>
                <p className="muted-line">{team.city}</p>
                <dl>
                  <dt>Coach</dt>
                  <dd>{team.coach}</dd>
                  <dt>Members</dt>
                  <dd>{team.memberCount}</dd>
                  <dt>Weekly goal</dt>
                  <dd>{team.weeklyGoalMinutes} minutes</dd>
                </dl>
              </article>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Teams

import { useCollection } from '../api'

function Users() {
  const { endpoint, error, items: users, status } = useCollection('users')

  return (
    <section className="content-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Profiles</p>
          <h1>Users</h1>
        </div>
        <span className="endpoint-label">{endpoint}</span>
      </div>

      {status === 'loading' && <p className="state-text">Loading users...</p>}
      {status === 'error' && <p className="alert alert-warning mb-0">{error}</p>}

      {status === 'success' && (
        <div className="row g-3">
          {users.map((user) => (
            <div className="col-md-6 col-xl-4" key={user._id ?? user.username ?? user.email}>
              <article className="data-card h-100">
                <h2>{user.fullName ?? user.username}</h2>
                <p className="muted-line">{user.email}</p>
                <dl>
                  <dt>Team</dt>
                  <dd>{user.teamName}</dd>
                  <dt>Role</dt>
                  <dd>{user.role}</dd>
                  <dt>Goal</dt>
                  <dd>{user.fitnessGoal}</dd>
                </dl>
              </article>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Users

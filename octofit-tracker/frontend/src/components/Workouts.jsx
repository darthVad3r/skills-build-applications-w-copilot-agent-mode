import { API_BASE_URL, useCollection } from '../api'

const workoutsEndpoint = `${API_BASE_URL}/api/workouts/`

function Workouts() {
  const { endpoint, error, items: workouts, status } = useCollection('workouts', workoutsEndpoint)

  return (
    <section className="content-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Suggestions</p>
          <h1>Workouts</h1>
        </div>
        <span className="endpoint-label">{endpoint}</span>
      </div>

      {status === 'loading' && <p className="state-text">Loading workouts...</p>}
      {status === 'error' && <p className="alert alert-warning mb-0">{error}</p>}

      {status === 'success' && (
        <div className="row g-3">
          {workouts.map((workout) => (
            <div className="col-lg-4" key={workout._id ?? workout.title}>
              <article className="data-card h-100">
                <span className="difficulty-pill">{workout.difficulty}</span>
                <h2>{workout.title}</h2>
                <p className="muted-line">{workout.focusArea} · {workout.durationMinutes} min</p>
                <p>{workout.recommendedFor}</p>
                <ul className="exercise-list">
                  {(workout.exercises ?? []).map((exercise) => (
                    <li key={exercise}>{exercise}</li>
                  ))}
                </ul>
              </article>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Workouts

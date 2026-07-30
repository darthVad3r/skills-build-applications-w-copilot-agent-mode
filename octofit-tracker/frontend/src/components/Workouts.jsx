import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const API_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : `http://localhost:8000/api/workouts/`

function extractList(data, key) {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.results)) return data.results
  if (Array.isArray(data?.[key])) return data[key]
  return []
}

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => setWorkouts(extractList(data, 'workouts')))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading workouts...</p>
  if (error) return <p>Error loading workouts: {error}</p>

  return (
    <div>
      <h2>Workouts</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Focus Area</th>
            <th>Difficulty</th>
            <th>Duration (min)</th>
            <th>Exercises</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout) => (
            <tr key={workout._id ?? workout.id}>
              <td>{workout.title}</td>
              <td>{workout.focusArea}</td>
              <td>{workout.difficulty}</td>
              <td>{workout.durationMinutes}</td>
              <td>{Array.isArray(workout.exercises) ? workout.exercises.join(', ') : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Workouts
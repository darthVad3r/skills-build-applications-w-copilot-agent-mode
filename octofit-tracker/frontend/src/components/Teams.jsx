import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const API_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : `http://localhost:8000/api/teams/`

function extractList(data, key) {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.results)) return data.results
  if (Array.isArray(data?.[key])) return data[key]
  return []
}

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => setTeams(extractList(data, 'teams')))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading teams...</p>
  if (error) return <p>Error loading teams: {error}</p>

  return (
    <div>
      <h2>Teams</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>Coach</th>
            <th>Members</th>
            <th>Weekly Goal (min)</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team._id ?? team.id}>
              <td>{team.name}</td>
              <td>{team.city}</td>
              <td>{team.coach}</td>
              <td>{team.memberCount}</td>
              <td>{team.weeklyGoalMinutes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Teams
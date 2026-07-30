import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const API_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : `http://localhost:8000/api/leaderboard/`

function extractList(data, key) {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.results)) return data.results
  if (Array.isArray(data?.[key])) return data[key]
  return []
}

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => setEntries(extractList(data, 'leaderboard')))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading leaderboard...</p>
  if (error) return <p>Error loading leaderboard: {error}</p>

  return (
    <div>
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Team</th>
            <th>Points</th>
            <th>Active Minutes</th>
          </tr>
        </thead>
        <tbody>
          {entries
            .slice()
            .sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0))
            .map((entry) => (
              <tr key={entry._id ?? entry.id}>
                <td>{entry.rank}</td>
                <td>{entry.userName}</td>
                <td>{entry.teamName}</td>
                <td>{entry.points}</td>
                <td>{entry.activityMinutes}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Leaderboard
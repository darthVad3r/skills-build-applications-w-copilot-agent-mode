import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const API_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : `http://localhost:8000/api/users/`

function extractList(data, key) {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.results)) return data.results
  if (Array.isArray(data?.[key])) return data[key]
  return []
}

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => setUsers(extractList(data, 'users')))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading users...</p>
  if (error) return <p>Error loading users: {error}</p>

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Team</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id ?? user.id}>
              <td>{user.fullName}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.teamName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
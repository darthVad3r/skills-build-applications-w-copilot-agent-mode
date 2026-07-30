import { API_BASE_URL, useCollection } from '../api'

const endpoint = `${API_BASE_URL}/api/activities/`;

function formatActivityDate(activityDate) {
  if (!activityDate) {
    return 'No date recorded'
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(activityDate))
}

function Activities() {
  const { endpoint: resolvedEndpoint, error, items: activities, status } = useCollection('activities', endpoint)

  return (
    <section className="content-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Training log</p>
          <h1>Activities</h1>
        </div>
        <span className="endpoint-label">{resolvedEndpoint}</span>
      </div>

      {status === 'loading' && <p className="state-text">Loading activities...</p>}
      {status === 'error' && <p className="alert alert-warning mb-0">{error}</p>}

      {status === 'success' && (
        <div className="table-responsive data-table-wrap">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th>User</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Distance</th>
                <th>Calories</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id ?? `${activity.userName}-${activity.activityDate}`}>
                  <td>{activity.userName}</td>
                  <td className="text-capitalize">{activity.type}</td>
                  <td>{activity.durationMinutes} min</td>
                  <td>{activity.distanceMiles ? `${activity.distanceMiles} mi` : 'n/a'}</td>
                  <td>{activity.caloriesBurned}</td>
                  <td>{formatActivityDate(activity.activityDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Activities

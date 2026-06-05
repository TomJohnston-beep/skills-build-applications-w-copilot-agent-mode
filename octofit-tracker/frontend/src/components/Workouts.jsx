import { getApiBaseUrl, useFetch } from '../lib/api';

export default function Workouts() {
  const { data: workouts, loading, error } = useFetch('/api/workouts');

  return (
    <div className="container py-5">
      <h2>Workouts</h2>
      <p className="text-muted">Using API endpoint: <code>{`${getApiBaseUrl()}/api/workouts`}</code></p>
      {loading && <p>Loading workouts...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (!workouts || workouts.length === 0) && <p>No workouts found.</p>}
      {!loading && !error && workouts && workouts.length > 0 && (
        <ul className="list-group">
          {workouts.map((item, index) => (
            <li className="list-group-item" key={index}>{JSON.stringify(item)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

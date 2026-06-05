import { getApiBaseUrl, useFetch } from '../lib/api';

export default function Leaderboard() {
  const { data: leaderboard, loading, error } = useFetch('/api/leaderboard');

  return (
    <div className="container py-5">
      <h2>Leaderboard</h2>
      <p className="text-muted">Using API endpoint: <code>{`${getApiBaseUrl()}/api/leaderboard`}</code></p>
      {loading && <p>Loading leaderboard...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (!leaderboard || leaderboard.length === 0) && <p>No leaderboard entries found.</p>}
      {!loading && !error && leaderboard && leaderboard.length > 0 && (
        <ul className="list-group">
          {leaderboard.map((item, index) => (
            <li className="list-group-item" key={index}>{JSON.stringify(item)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

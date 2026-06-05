import { useEffect, useState } from 'react';

// Example Codespaces API endpoint:
// https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users
const getApiBaseUrl = () => {
  const codespace = import.meta.env.VITE_CODESPACE_NAME;
  return codespace && codespace.trim() !== ''
    ? `https://${codespace}-8000.app.github.dev`
    : 'http://localhost:8000';
};

const normalizeResponse = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== 'object') return [];
  const wrapped = payload;
  const arrayKeys = ['data', 'results', 'items', 'entries', 'docs'];
  for (const key of arrayKeys) {
    if (Array.isArray(wrapped[key])) {
      return wrapped[key];
    }
  }
  const firstArray = Object.values(wrapped).find(Array.isArray);
  return Array.isArray(firstArray) ? firstArray : [payload];
};

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${getApiBaseUrl()}/api/users`)
      .then((response) => response.json())
      .then((data) => setUsers(normalizeResponse(data)))
      .catch((err) => setError(err.message || String(err)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container py-5">
      <h2>Users</h2>
      <p className="text-muted">Using API endpoint: <code>{`${getApiBaseUrl()}/api/users`}</code></p>
      {loading && <p>Loading users...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && users.length === 0 && <p>No users found.</p>}
      {!loading && !error && users.length > 0 && (
        <ul className="list-group">
          {users.map((item, index) => (
            <li className="list-group-item" key={index}>{JSON.stringify(item)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

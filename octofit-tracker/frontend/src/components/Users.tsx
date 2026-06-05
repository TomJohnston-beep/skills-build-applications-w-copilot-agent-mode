import { useEffect, useState } from 'react';

const getApiBaseUrl = () => {
  const codespace = import.meta.env.VITE_CODESPACE_NAME;
  return codespace && codespace.trim() !== ''
    ? `https://${codespace}-8000.app.github.dev`
    : 'http://localhost:8000';
};

const normalizeResponse = (payload: unknown) => {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== 'object') return [];

  const wrapped = payload as Record<string, unknown>;
  const arrayKeys = ['data', 'results', 'items', 'entries', 'docs'];
  for (const key of arrayKeys) {
    if (Array.isArray(wrapped[key])) {
      return wrapped[key] as unknown[];
    }
  }

  const firstArray = Object.values(wrapped).find(Array.isArray);
  if (Array.isArray(firstArray)) return firstArray;

  return [payload];
};

const renderCell = (value: unknown) => {
  if (value === null || value === undefined) return '-';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
};

const renderTable = (items: unknown[]) => {
  if (items.length === 0) {
    return <p>No users found.</p>;
  }

  const first = items[0] as Record<string, unknown>;
  const headers = Array.isArray(first)
    ? ['item']
    : Object.keys(first);

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => {
            if (Array.isArray(item)) {
              return (
                <tr key={index}>
                  <td>{JSON.stringify(item)}</td>
                </tr>
              );
            }
            const record = item as Record<string, unknown>;
            return (
              <tr key={index}>
                {headers.map((header) => (
                  <td key={header}>{renderCell(record[header])}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default function Users() {
  const [users, setUsers] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const url = `${getApiBaseUrl()}/api/users`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => setUsers(normalizeResponse(data)))
      .catch((err) => setError(String(err)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container py-5">
      <h2>Users</h2>
      <p className="text-muted">Using API endpoint: <code>{`${getApiBaseUrl()}/api/users`}</code></p>
      {loading && <p>Loading users...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && renderTable(users)}
    </div>
  );
}

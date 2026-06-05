import React from 'react';
import { getApiBaseUrl, useFetch } from '../lib/api';

export default function Users() {
  const { data: users, loading, error } = useFetch('/api/users');

  return (
    <div className="container py-5">
      <h2>Users</h2>
      <p className="text-muted">Using API endpoint: <code>{`${getApiBaseUrl()}/api/users`}</code></p>
      {loading && <p>Loading users...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (!users || users.length === 0) && <p>No users found.</p>}
      {!loading && !error && users && users.length > 0 && (
        <ul className="list-group">
          {users.map((item, index) => (
            <li className="list-group-item" key={index}>{JSON.stringify(item)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

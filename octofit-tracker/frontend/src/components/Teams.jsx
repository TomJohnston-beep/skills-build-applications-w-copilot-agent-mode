import React from 'react';
import { getApiBaseUrl, useFetch } from '../lib/api';

export default function Teams() {
  const { data: teams, loading, error } = useFetch('/api/teams');

  return (
    <div className="container py-5">
      <h2>Teams</h2>
      <p className="text-muted">Using API endpoint: <code>{`${getApiBaseUrl()}/api/teams`}</code></p>
      {loading && <p>Loading teams...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (!teams || teams.length === 0) && <p>No teams found.</p>}
      {!loading && !error && teams && teams.length > 0 && (
        <ul className="list-group">
          {teams.map((item, index) => (
            <li className="list-group-item" key={index}>{JSON.stringify(item)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

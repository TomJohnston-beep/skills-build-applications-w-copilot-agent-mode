import React from 'react';
import { useFetch, getApiBaseUrl } from '../lib/api';

export default function Activities() {
  const { data: activities, loading, error } = useFetch('/api/activities');

  return (
    <div className="container py-5">
      <h2>Activities</h2>
      <p className="text-muted">Using API endpoint: <code>{`${getApiBaseUrl()}/api/activities`}</code></p>
      {loading && <p>Loading activities...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (!activities || activities.length === 0) && <p>No activities found.</p>}
      {!loading && !error && activities && activities.length > 0 && (
        <ul className="list-group">
          {activities.map((item, index) => (
            <li className="list-group-item" key={index}>{JSON.stringify(item)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

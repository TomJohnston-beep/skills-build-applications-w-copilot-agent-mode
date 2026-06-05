import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('frontend page rendering', () => {
  it('renders the home page', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/OctoFit Tracker/i)).toBeInTheDocument();
    expect(screen.getByText(/Frontend API base URL:/i)).toBeInTheDocument();
  });

  it('renders users page and shows empty state', async () => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({ ok: true, text: async () => JSON.stringify([]) })
    ));

    render(
      <MemoryRouter initialEntries={['/users']}>
        <App />
      </MemoryRouter>
    );

    expect(await screen.findByText(/No users found/i)).toBeInTheDocument();
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { normalizeResponse, fetchJson } from '../api';

describe('normalizeResponse', () => {
  it('returns array unchanged', () => {
    const arr = [1, 2, 3];
    expect(normalizeResponse(arr)).toBe(arr);
  });

  it('extracts common array keys (data)', () => {
    const payload = { data: [{ id: 1 }] };
    expect(normalizeResponse(payload)).toEqual([{ id: 1 }]);
  });

  it('extracts common array keys (results)', () => {
    const payload = { results: ['a', 'b'] };
    expect(normalizeResponse(payload)).toEqual(['a', 'b']);
  });

  it('returns first found array value', () => {
    const payload = { meta: { total: 1 }, list: ['x', 'y'] };
    expect(normalizeResponse(payload)).toEqual(['x', 'y']);
  });

  it('wraps non-object payloads as empty array', () => {
    expect(normalizeResponse(123)).toEqual([]);
    expect(normalizeResponse(null)).toEqual([]);
    expect(normalizeResponse(undefined)).toEqual([]);
  });

  it('wraps single object in array if no arrays present', () => {
    const obj = { id: 5, name: 'single' };
    expect(normalizeResponse(obj)).toEqual([obj]);
  });
});

describe('fetchJson', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('parses JSON response successfully', async () => {
    const mock = vi.fn(() => Promise.resolve({
      ok: true,
      status: 200,
      text: async () => JSON.stringify({ hello: 'world' })
    }));
    // @ts-ignore
    global.fetch = mock;

    const data = await fetchJson('/api/test');
    expect(data).toEqual({ hello: 'world' });
    expect(mock).toHaveBeenCalled();
  });

  it('returns null for empty body', async () => {
    const mock = vi.fn(() => Promise.resolve({ ok: true, status: 200, text: async () => '' }));
    // @ts-ignore
    global.fetch = mock;

    const data = await fetchJson('/api/empty');
    expect(data).toBeNull();
  });

  it('returns plain text when JSON parse fails', async () => {
    const mock = vi.fn(() => Promise.resolve({ ok: true, status: 200, text: async () => 'not-json' }));
    // @ts-ignore
    global.fetch = mock;

    const data = await fetchJson('/api/text');
    expect(data).toBe('not-json');
  });

  it('throws error with status for non-ok responses (JSON body)', async () => {
    const mock = vi.fn(() => Promise.resolve({
      ok: false,
      status: 400,
      text: async () => JSON.stringify({ error: 'bad' })
    }));
    // @ts-ignore
    global.fetch = mock;

    await expect(fetchJson('/api/bad')).rejects.toMatchObject({ message: JSON.stringify({ error: 'bad' }), status: 400 });
  });

  it('throws error with status for non-ok responses (text body)', async () => {
    const mock = vi.fn(() => Promise.resolve({ ok: false, status: 500, text: async () => 'server error' }));
    // @ts-ignore
    global.fetch = mock;

    await expect(fetchJson('/api/error')).rejects.toMatchObject({ message: 'server error', status: 500 });
  });
});

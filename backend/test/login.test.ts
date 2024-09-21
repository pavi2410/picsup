import { describe, expect, it } from "bun:test";
import { app } from "../src";
import { decode } from "hono/jwt";

describe('Test API routes', () => {
  it('GET /health', async () => {
    const res = await app.request('/health');
    expect(res.ok).toBe(true);
  });

  it('should signup the user - POST /auth/signup', async () => {
    const res = await app.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        email: 'testuser@example.com',
        password: 'testpassword',
        username: 'testuser'
      })
    });
    expect(res.ok).toBe(true);
  })

  let token: string;

  it('should login the user - POST /auth/login', async () => {
    const res = await app.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'testuser@example.com',
        password: 'testpassword'
      })
    });
    expect(res.ok).toBe(true);

    const json = await res.json();
    token = json.token;
  })

  it('should return user profile - GET /api/user/profile', async () => {
    const userId = decode(token).payload.id;
    const res = await app.request('/api/user/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        userId
      })
    });
    expect(res.ok).toBe(true);
  })
});
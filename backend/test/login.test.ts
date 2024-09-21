import { describe, expect, it } from "bun:test";
import { app } from "../src";

describe('Test API routes', () => {
  it('GET /health', async () => {
    const res = await app.request('/health');
    expect(res).toBeDefined();
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
    expect(res).toBeDefined();
    expect(res.ok).toBe(true);
    expect(res.headers.get('Set-Cookie')).toBeDefined();
  })

  let cookie: string;

  it('should login the user - POST /auth/login', async () => {
    const res = await app.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'testuser@example.com',
        password: 'testpassword'
      })
    });
    expect(res).toBeDefined();
    expect(res.ok).toBe(true);
    expect(res.headers.get('Set-Cookie')).toBeDefined();

    cookie = res.headers.get('Set-Cookie')!;
  })

  it('should return user profile - GET /api/user/profile', async () => {
    expect(cookie).toBeDefined();

    const res = await app.request('/api/user/profile', {
      headers: {
        Cookie: cookie
      }
    });
    expect(res).toBeDefined();
    expect(res.ok).toBe(true);
  })
});
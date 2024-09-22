import { beforeAll, describe, expect, it } from "bun:test";
import { app } from "../src";

describe('Test images routes', () => {
  let cookie: string;
  beforeAll(async () => {
    const res = await app.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'testuser@example.com',
        password: 'testpassword'
      })
    });

    cookie = res.headers.get('Set-Cookie')!;
  })

  it('POST /api/images', async () => {
    const file = Bun.file('./test/fixtures/CoronaVirus_NSS_POSTER.png');
    const formData = new FormData();
    formData.set('file', new Blob([await file.arrayBuffer()], { type: file.type }), file.name);
    formData.set('tags', 'coronavirus,covid-19,poster');
    const res = await app.request('/api/images', {
      method: 'POST',
      headers: {
        Cookie: cookie
      },
      body: formData,
    });
    expect(res).toBeDefined();
    expect(res.ok).toBe(true);
    const body = await res.json();
    expect(body.id).toBeDefined();
  })

  it('GET /api/images', async () => {
    const res = await app.request('/api/images', {
      headers: {
        Cookie: cookie
      }
    });
    expect(res).toBeDefined();
    expect(res.ok).toBe(true);
    const body = await res.json();
    expect(body.images).toBeDefined();
    expect(body.images.length).toBeGreaterThan(0);
  })
})
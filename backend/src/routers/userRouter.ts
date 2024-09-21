import { eq } from "drizzle-orm";
import { Hono } from 'hono';
import { db } from '../db/index.js';
import { users } from '../db/schema.js';

const router = new Hono()

router.get('/profile', async (c) => {
    const payload = c.get('jwtPayload');

    const user = (await db.select().from(users).where(eq(users.id, payload.id)))[0];

    return c.json({
        id: user.id,
        name: user.name,
        email: user.email,
    })
});

export default router
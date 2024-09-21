import { eq } from "drizzle-orm";
import { Hono } from 'hono';
import { db } from '../db/index.js';
import { users } from '../db/schema.js';

const router = new Hono()

router.get('/profile', async (c) => {
    const { userId } = await c.req.json<{
        userId: string,
    }>();

    const user = (await db.select().from(users).where(eq(users.id, userId)))[0];

    return c.json({
        id: user.id,
        name: user.name,
        email: user.email,
    })
});

export default router
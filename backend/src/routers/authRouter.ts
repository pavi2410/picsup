import { eq } from "drizzle-orm";
import { Hono } from 'hono';
import { sign } from 'hono/jwt';
import { setCookie } from 'hono/cookie'
import { JWT_SECRET } from '../config.js';
import { db } from '../db/index.js';
import { users } from '../db/schema.js';

const router = new Hono()

router.post('/signup', async (c) => {
    const { email, password, username } = await c.req.json<{
        email: string,
        password: string,
        username: string,
    }>();

    const passwordHash = await Bun.password.hash(password);

    const newUser = await db.insert(users).values({
        email,
        passwordHash,
        name: username,
    }).returning();

    const signedToken = await sign(
        {
            email,
            username,
            id: newUser[0].id,
        },
        JWT_SECRET!,
    )

    setCookie(c, 'jwt', signedToken)
    c.status(200)
    return c.body(null)
});

router.post('/login', async (c) => {
    const { email, password } = await c.req.json<{
        email: string,
        password: string,
    }>();

    try {
        const user = await db.select().from(users).where(eq(users.email, email)).get();

        if (!user || !user.passwordHash || !(await Bun.password.verify(password, user.passwordHash))) {
            c.status(401)
            return c.text('Authentication failed. Invalid user or password.');
        }

        const signedToken = await sign(
            {
                email: user.email,
                username: user.name,
                id: user.id
            },
            JWT_SECRET!,
        )

        setCookie(c, 'jwt', signedToken)
        c.status(200)
        return c.body(null)
    } catch (error) {
        c.status(401)
        return c.text('Authentication failed. Invalid user or password.' + error.message);
    }
});

export default router
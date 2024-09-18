import { eq } from "drizzle-orm";
import { Hono } from 'hono';
import { sign } from 'hono/jwt';
import { JWT_SECRET } from '../config.js';
import { db, users } from '../db.js';

const router = new Hono()

router.post('/profile', async (c) => {
    // if (!req.user) {
    //     res.status(401).json({ message: 'Invalid token' });
    //     return
    // }

    const { userId } = c.req.json<{
        userId: string,
    }>();

    const user = (await db.select().from(users).where(eq('id', userId)))[0];

    return c.json({ user })
});

router.post('/signup', async (c) => {
    const { email, password, username } = await c.req.json<{
        email: string,
        password: string,
        username: string,
    }>();

    const passwordHash = await Bun.password.hash(password);

    await db.insert(users).values({
        email,
        passwordHash,
        name: username,
    });

    return c.json("User added");
});

router.post('/login', async (c) => {
    const { email, password } = await c.req.json<{
        email: string,
        password: string,
    }>();

    try {
        const user = (await db.select().from(users).where(eq('email', email)))[0];

        if (!user || !user.passwordHash || !(await Bun.password.verify(password, user.passwordHash))) {
            c.status(401)
            return c.text('Authentication failed. Invalid user or password.');
        }

        const signedToken = sign(
            {
                email: user.email,
                username: user.name,
                id: user.id
            },
            JWT_SECRET,
        )

        return c.json({ token: signedToken });
    } catch (error) {
        c.status(401)
        return c.text('Authentication failed. Invalid user or password.');
    }
});

export default router
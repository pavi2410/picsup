import { and, eq } from "drizzle-orm";
import { Hono } from 'hono';
import { db, images } from '../db.js';

const router = new Hono()

router.get('/images', async (c) => {
    const imageList = await db.select().from(images)

    return c.json({ images: imageList.map(image => image.id) })
})

router.get('/image/:id', async (c) => {
    const { id: imageId } = c.req.param()

    const image = (await db.select().from(images).where(eq('id', imageId)))[0];

    c.header('Content-Type', image.content_type!)
    // c.body(Buffer.from(image.img))
    return c.text('TODO: send image file')
})

router.post('/upload', upload.single('uploaded_file'), async (c) => {
    const file = req.file;

    if (!file) {
        c.status(400)
        return c.text("Please upload a file");
    }

    const tags = [...req.body.tags.split(',')]

    // save image to IMAGES_DIR and save image info to database

    const newimage = await db.insert(images).values({
        name: file.originalname,
        content_type: file.mimetype,
        ownerId: req.user.id,
        tags: tags
    });

    return c.json({ id: newimage.id })
})

router.delete('/image/:id', async (c) => {
    const { id: imageId } = c.req.param()

    await db.delete(images).where(and(eq('id', imageId), eq('ownerId', req.user.id)))

    return c.text("Image Deleted");
})

router.get('/ownerimages', async (c) => {
    // todo: make it a middleware
    if (!req.user) {
        c.status(401)
        return c.json({ message: 'Invalid token' });
    }

    const imageList = await db.select().from(images).where(eq('ownerId', req.user.id))

    return c.json({ images: imageList.map(image => image.id) })
})

router.get('/ownerimage/:id', async (c) => {
    if (!req.user) {
        c.status(401)
        return c.json({ message: 'Invalid token' });
    }

    const { id: imageId } = c.req.param()

    const image = (await db.select().from(images).where(and(eq('id', imageId), eq('ownerId', req.user.id)))[0];

    c.header('Content-Type', image.mimetype)
    // c.send(image.img.data)
    return c.text('TODO: send image file')
})

export default router
import { and, eq } from "drizzle-orm";
import { Hono } from 'hono';
import { db } from '../db/index.js';
import { images } from '../db/schema.js';
import { IMAGES_DIR } from "../config.js";
import { basename } from 'node:path';

const router = new Hono()

router.get('/public', async (c) => {
    const imageList = await db.select().from(images)

    return c.json({ images: imageList.map(image => image.id) })
})

router.get('/public/:id', async (c) => {
    const { id: imageId } = c.req.param()

    const image = await db.select().from(images).where(eq(images.id, Number(imageId))).get();

    if (!image) {
        c.status(404)
        return c.body(null);
    }

    const contentFile = Bun.file(`${IMAGES_DIR}/${image.contentHash}`);

    c.header('Content-Type', image.contentType!)
    return c.body(await contentFile.arrayBuffer())
})

router.get('/', async (c) => {
    const payload = c.get('jwtPayload');

    const imageList = await db.select().from(images).where(eq(images.ownerId, payload.id))

    return c.json({ images: imageList.map(image => image.id) })
})

router.get('/:id', async (c) => {
    const payload = c.get('jwtPayload');

    const { id: imageId } = c.req.param()

    const image = await db.select().from(images).where(
        and(eq(images.id, Number(imageId)), eq(images.ownerId, payload.id))
    ).get();

    if (!image) {
        c.status(404)
        return c.body(null);
    }

    const contentFile = Bun.file(`${IMAGES_DIR}/${image.contentHash}`);

    c.header('Content-Type', image.contentType!)
    return c.body(await contentFile.arrayBuffer())
})

router.post('/', async (c) => {
    const payload = c.get('jwtPayload');

    const body = await c.req.formData();

    const uploadedFile = body.get('file') as File;

    if (!uploadedFile) {
        c.status(400)
        return c.body(null);
    }

    const tags = body.get('tags') as string;

    // save image to IMAGES_DIR and save image info to database
    const contentHash = Bun.hash(await uploadedFile.arrayBuffer());
    const contentFile = Bun.file(`${IMAGES_DIR}/${contentHash}`);
    if (!await contentFile.exists()) {
        await Bun.write(contentFile, uploadedFile)
    }

    const newImage = await db.insert(images).values({
        ownerId: payload.id,
        contentHash: String(contentHash),
        contentType: uploadedFile.type,
        name: basename(uploadedFile.name),
        tags: tags
    }).returning();

    return c.json({ id: newImage[0].id })
})

router.delete('/:id', async (c) => {
    const payload = c.get('jwtPayload');

    const { id: imageId } = c.req.param()

    await db.delete(images).where(and(eq(images.id, Number(imageId)), eq(images.ownerId, payload.id)))

    return c.text("Image Deleted");
})

export default router
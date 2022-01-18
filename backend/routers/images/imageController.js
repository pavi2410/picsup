import multer from 'multer'
import prisma from '../../prismaClient.js'

const upload = multer()

export const getAllImages = async (req, res) => {
  const images = await prisma.images.findMany()

  res.json({ images: images.map(image => image.id) })
}

export const getImageById = async (req, res) => {
  const { id: imageId } = req.params

  const image = await prisma.images.findUnique({
    where: {
      id: imageId
    }
  })

  res.set('Content-Type', image.content_type)
  res.send(Buffer.from(image.img))
}

export const uploadSingleFile = upload.single('uploaded_file')

export const uploadImage = async (req, res) => {
  const file = req.file;

  if (!file) {
    res.status(400).send("Please upload a file");
    return
  }

  const tags = [...req.body.tags.split(',')]

  const newimage = await prisma.images.create({
    data: {
      name: file.originalname,
      img: file.buffer,
      content_type: file.mimetype,
      ownerId: req.user.id,
      tags: tags
    }
  });

  res.json({ id: newimage.id })
}

export const deleteImageById = async (req, res) => {
  const { id: imageId } = req.params

  await prisma.images.delete({
    where: {
      id: imageId,
      ownerId: req.user.id
    }
  })

  res.send("Image Deleted");
}

export const getAllOwnerImages = async (req, res) => {
  const images = await prisma.images.findMany({
    where: {
      ownerId: req.user.id
    }
  })

  res.json({ images: images.map(image => image.id) })
}

export const getOwnerImageById = async (req, res) => {
  const { id: imageId } = req.params

  const image = await prisma.images.findUnique({
    where: {
      id: imageId,
      ownerId: req.user.id
    }
  })

  res.set('Content-Type', image.img.contentType)
  res.send(image.img.data)
}

import multer from 'multer'
import prisma from '../../prisma.js'

const upload = multer()

export const getAllImages = async (req, res) => {
  Images.find({})
    .then((images, err) => {
      if (err) {
        console.log('/images:', err)
        res.sendStatus(404)
        return
      };
      res.json({ images: images.map(image => image._id) })
    })
}

export const getImageById = (req, res) => {
  // console.log({params: req.params})
  Images.findById(req.params.id).then((image, err) => {
    if (err || image == null) {
      res.sendStatus(404);
      return;
    }
    res.set('Content-Type', image.img.contentType)
    res.send(image.img.data)
  })
}

export const uploadSingleFile = upload.single('uploaded_file')

export const uploadImage = async (req, res) => {
  const file = req.file;
  if (!file) {
    res.status(400).send("Please upload a file");
    return
  }

  console.log({ owner: req.user })

  const tags = [...req.body.tags.split(',')]

  const obj = {
    name: file.originalname,
    img: {
      data: file.buffer,
      contentType: file.mimetype
    },
    ownerid: req.user._id,
    tags: tags,
  }
  const newimage = new Images(obj);
  newimage.save((err, resp) => {
    if (err) {
      res.status(500).send('Failed to store image')
      return
    }
    res.json({ id: resp._id })
  });
}

export const deleteImageById = async (req, res) => {
  const { id } = req.params

  await prisma.

    Images.findOneAndRemove({ _id: req.params.id, ownerid: req.user._id }).then((image, err) => {
      if (err || image == null) {
        res.sendStatus(404);
        return;
      }
      res.send("Image Deleted");
    })
}

export const getAllOwnerImages = (req, res) => {
  Images.find({ ownerid: req.user._id })
    .then((images, err) => {
      if (err) {
        console.log('/images:', err)
        res.sendStatus(404)
        return
      };
      res.json({ images: images.map(image => image._id) })
    })
}

export const getOwnerImageById = (req, res) => {
  // console.log({params: req.params})
  Images.findById(req.params.id).then((image, err) => {
    if (err || image == null) {
      res.sendStatus(404);
      return;
    }
    res.set('Content-Type', image.img.contentType)
    res.send(image.img.data)
  })
}

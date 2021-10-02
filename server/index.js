const os = require('os');
const path = require('path');
const fs = require('fs/promises');
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors')

// ------- Setup -------

mongoose.connect('mongodb+srv://Admin:admin@picsup.ifxzn.mongodb.net/picsup?retryWrites=true&w=majority').
then(()=>{console.log("DB connected")},(err)=>{console.log(err)});

const app = express()
const port = 3100

app.use(cors())

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const tmpdir = path.join(os.tmpdir(), 'picsup')
    fs.mkdir(tmpdir, {recursive:true})
    .then(() => {
      cb(null, tmpdir)
    })
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({ storage: storage })

// ------- Models -------

var imageSchema = new mongoose.Schema({
  name: String,
  img:
  {
    data: Buffer,
    contentType: String
  }
})
const Images = new mongoose.model('Image', imageSchema);

// ------- Request handlers -------

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/images', (req, res) => {
  Images.find({})
  .then((images, err) => {
    if (err) {
      console.log('/images:', err)
      res.sendStatus(404)
      return
    };
    res.json({images: images.map(image => image._id) })
  })
})

app.get('/image/:id', (req, res) => {
  // console.log({params: req.params})
  Images.findById(req.params.id).then( (image, err) => {
    if (err) {
      res.sendStatus(404);
      return;
    }

    res.set('Content-Type', image.img.contentType)
    res.send(image.img.data)
  })
})

app.post('/upload', upload.single('uploaded_file'), function (req, res) {
  const file = req.file;
  if(!file){
    res.status(400).send("Please upload a file");
  }

  fs.readFile(req.file.path).then(file => {
    console.log('upload', file)
    var obj = {
      name: req.file.originalname,
      img: {
        data: file,
        contentType: req.file.mimetype
      }
    }
    const newimage = new Images(obj);
    newimage.save(obj, (err, resp) => {
      if (err) {
        res.status(500).send('Failed to store image')
        return
      }
      console.log(resp);
      res.send("id: " + resp._id)
    });
  })
});

app.listen(port, () => {
  console.log(`picsup server listening at http://localhost:${port}`)
})

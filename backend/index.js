const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors')
const logger = require('morgan')
const compression = require('compression')
require('./userModel')
const {Images} = require('./imageModel')
const jsonwebtoken = require("jsonwebtoken");
const userController = require('./userController.js');
// ------- Setup -------

const MONGO_URL = process.env.MONGO_HOST || 'mongodb+srv://Admin:admin@picsup.ifxzn.mongodb.net/picsup?retryWrites=true&w=majority'
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.info('DB', 'connected'))
  .catch((err) => console.error('DB', err));

const app = express()
const upload = multer()

app.use(logger('dev'))
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(compression())
app.use(function (req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function (err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

// todoList Routes
app.route('/api/tasks')
  .post(userController.loginRequired, userController.profile);
app.route('/api/signup')
  .post(userController.signup);
app.route('/api/login') 
  .post(userController.login);

// ------- Request handlers -------

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.get('/api/ownerimages', (req, res) => {
  Images.find({ownerid: req.user._id})
    .then((images, err) => {
      if (err) {
        console.log('/images:', err)
        res.sendStatus(404)
        return
      };
      res.json({ images: images.map(image => image._id) })
    })
})

app.get('/api/ownerimage/:id', (req, res) => {
  // console.log({params: req.params})
  Images.findById(req.params.id).then((image, err) => {
    if (err || image == null) {
      res.sendStatus(404);
      return;
    }
    res.set('Content-Type', image.img.contentType)
    res.send(image.img.data)
  })
})

app.get('/api/images', (req, res) => {
  Images.find({})
    .then((images, err) => {
      if (err) {
        console.log('/images:', err)
        res.sendStatus(404)
        return
      };
      res.json({ images: images.map(image => image._id) })
    })
})

app.get('/api/me/images', (req, res) => {
  Images.find({ownerid: req.user._id})
    .then((images, err) => {
      if (err) {
        console.log('/images:', err)
        res.sendStatus(404)
        return
      };
      res.json({ images: images.map(image => image._id) })
    })
})

app.get('/api/image/:id', (req, res) => {
  // console.log({params: req.params})
  Images.findById(req.params.id).then((image, err) => {
    if (err || image == null) {
      res.sendStatus(404);
      return;
    }
    res.set('Content-Type', image.img.contentType)
    res.send(image.img.data)
  })
})

app.post('/api/upload', upload.single('uploaded_file'), function (req, res) {
  const file = req.file;
  if (!file) {
    res.status(400).send("Please upload a file");
    return
  }

  console.log({ owner: req.user})

  const obj = {
    name: file.originalname,
    img: {
      data: file.buffer,
      contentType: file.mimetype
    },
    ownerid: req.user._id
  }
  const newimage = new Images(obj);
  newimage.save((err, resp) => {
    if (err) {
      res.status(500).send('Failed to store image')
      return
    }
    res.json({ id: resp._id })
  });
});

app.delete('/api/image/:id', (req, res) => {
  // console.log(req.params.id)
  Images.findOneAndRemove({_id: req.params.id, ownerid: req.user._id}).then((image, err) => {
    if (err || image == null) {
      res.sendStatus(404);
      return;
    }
    res.send("Image Deleted");
  })
})

app.use(express.static(path.resolve(__dirname, "../frontend/dist")));
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
});

const port = process.env.PORT||4000
app.listen(port, () => {
  console.log(`picsup server listening at http://localhost:${port}`)
})

module.exports = app;
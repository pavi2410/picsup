const os = require('os');
const path = require('path');
const fs = require('fs/promises');
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors')
const logger = require('morgan')
const bcrypt = require('bcrypt')
require('./userModel')
const jsonwebtoken = require("jsonwebtoken");
const userController = require('./userController.js');

// TODO: https://www.digitalocean.com/community/tutorials/test-a-node-restful-api-with-mocha-and-chai

// ------- Setup -------

const options = {
  socketTimeoutMS: 30000,
  keepAlive: true
};

const MONGO_URL = process.env.MONGO_HOST || 'mongodb+srv://Admin:admin@picsup.ifxzn.mongodb.net/picsup?retryWrites=true&w=majority'
mongoose.connect(MONGO_URL, options)
  .then(() => console.info('DB', 'connected'))
  .catch((err) => console.error('DB', err));

const app = express()

app.use(logger('dev'))
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(function(req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
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
app.route('/tasks')
  .post(userController.loginRequired, userController.profile);
app.route('/signup')
  .post(userController.signup);
app.route('/login')
  .post(userController.login);


if (process.env.NODE_ENV == "production") {
  app.use(express.static("../frontend/dist"))
}

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const tmpdir = path.join(os.tmpdir(), 'picsup')
    fs.mkdir(tmpdir, { recursive: true })
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

// app.post('/signup', (req, res) => {
//   console.log(req.body);
//   let user = User.findOne({ email: req.body.email });
//   if (!user) return res.status(400).send("User already exists");
//   const makeuser = new User({
//     email: req.body.email,
//     password: req.body.password,
//     username: req.body.username
//   })
//   makeuser.save((err, resp) => {
//     if (err) {
//       res.status(500).send('Failed to create User')
//       return
//     }
//     res.send("User Registration Successful");
//   })
// })

// app.post('/login', (req, res) => {
//   User.findOne({ email: req.body.email, password: req.body.password })
//     .then(user => {
//       res.status(200).send("Login Successful");
//     })
//     .catch(err => {
//       res.send("Some error occured while logging in. Please try again");
//     })

// })

app.get('/', (req, res) => {
  res.send('Hello')
})

app.get('/images', (req, res) => {
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

app.get('/image/:id', (req, res) => {
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

app.post('/upload', upload.single('uploaded_file'), function (req, res) {
  const file = req.file;
  if (!file) {
    res.status(400).send("Please upload a file");
  }

  fs.readFile(req.file.path).then(file => {
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
      res.send("id: " + resp._id)
    });
  })
});

app.delete('/image/:id', (req, res) => {
  // console.log(req.params.id)
  Images.findByIdAndRemove(req.params.id).then((image, err) => {
    if (err || image == null) {
      res.sendStatus(404);
      return;
    }
    res.send("Image Deleted");
  })
})

const port = process.env.PORT
app.listen(port, () => {
  console.log(`picsup server listening at http://localhost:${port}`)
})

module.exports = app;
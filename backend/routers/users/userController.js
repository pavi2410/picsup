import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const signup = (req, res) => {
  var newUser = new User(req.body);
  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  newUser.save(function (err, user) {
    if (err) {
      return res.status(400).send({
        message: err
      });
    } else {
      user.hash_password = undefined;
      return res.json("User added");
    }
  });
};

export const login = (req, res) => {
  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) throw err;
    if (!user || !bcrypt.compareSync(req.body.password, user.hash_password)) {
      return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
    }
    return res.json({ token: jwt.sign({ email: user.email, username: user.username, _id: user._id }, 'RESTFULAPIs',), username: user.username });
  });
};

export const profile = (req, res, next) => {
  if (req.user) {
    res.send(req.user);
  }
  else {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
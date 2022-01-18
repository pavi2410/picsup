import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import prisma from '../../prismaClient.js'

export const signup = async (req, res) => {
  const { email, password, username } = req.body
  const hash_password = bcrypt.hashSync(password, 10);

  const newuser = await prisma.users.create({
    data: {
      email,
      hash_password,
      username,
    }
  })

  res.json("User added");
}

export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await prisma.users.findUnique({
      where: {
        email
      }
    })

    if (!user || !bcrypt.compareSync(password, user.hash_password)) {
      res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
      return
    }

    const signedToken = jwt.sign({ email: user.email, username: user.username, id: user.id }, 'RESTFULAPIs')

    res.json({ token: signedToken });
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
  }
}

export const profile = async (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: 'Invalid token' });
    return
  }

  const user = await prisma.users.findUnique({
    where: {
      id: req.user.id
    }
  })

  res.json({ user })
};
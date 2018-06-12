import { Router } from 'express'
const users = Router();

users.get('/api/users', (req, res, next) => {
  next();
})

export default users;
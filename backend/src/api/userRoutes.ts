import express from 'express';
import { User } from '../models/user';

const router = express.Router();

// creating an new user in db

router.post('/users', async (req, res, next) => {
    try {
      const newUser = await User.create(req.body);
      res.status(201).json({ data: newUser, message: 'User created successfully' });
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

//find all the users from the db

router.get('/users', async(req, res, next) => {
    try {
 
        const alluser = await User.findAll();
        res.json({ data: alluser,message:'success'});
      } catch (error) {
        console.error(error);
        next(error);
      }
    });

// find user by id from the db
router.get('/users/:id', async (req, res, next) => {
    try {
      const userId = req.params.id;
  
      const user = await User.findByPk(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'user not found' });
      }
  
      res.json({ data: user, message: 'Client retrieved successfully' });
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

  export default router;
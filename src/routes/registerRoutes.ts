import express, { Request, Response } from 'express';

import registerValidation from '../middleware/registerValidation';

import getUserData from 'src/utils/getUserData';
import setUserData from 'src/utils/setUserData';

const route = express.Router();

route.post(
  '/create',
  registerValidation.create(),
  async (req: Request, res: Response) => {
    const { email, password, name, birth, gender } = req.body;
    const users = await getUserData();
    const newUser = {
      id: users.newId,
      email,
      password,
      name,
      birth,
      gender
    };

    const response = await setUserData(newUser);

    if(response.error) 
      return res.status(400).json({ message: response.error });

    return res.json({ message: 'User successfully registered!' }).status(200);
  }
);

export default route;
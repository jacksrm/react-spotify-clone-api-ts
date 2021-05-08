import express, { Request, Response } from 'express';
import profileValidation from 'src/middleware/profileValidation';
import updateUserData from 'src/utils/updateUserData';

const route = express.Router();

route.patch(
  '/update/:id',
  profileValidation.update(),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

   const result = await updateUserData(parseInt(id), data)

   if(result.error)
    return res.status(result.status).json({ message: result.error });

    return res.status(200).json({ message: result.message });
  }
);

export default route
import { Router } from 'express';
import multer from 'multer';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import fileConfig from '@config/fileConfig';
import CreateUsersController from '@modules/users/controllers/CreateUsersController';
import UpdateUserAvatarController from '@modules/users/controllers/UpdateUserAvatarController';
const usersRouter = Router();
const upload = multer(fileConfig);


const createUsersController = new CreateUsersController();
const updateUserAvatarController = new UpdateUserAvatarController();
usersRouter.post('/', async (request, response) => {
    return await createUsersController.create(request,response);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    return await updateUserAvatarController.create(request,response);
   
  }
);
export default usersRouter;

import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '@modules/users/services/CreateUserService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import fileConfig from '@config/fileConfig';
import UploadAvatarService from '@modules/users/services/UploadAvatarService';

const usersRouter = Router();
const upload = multer(fileConfig);
usersRouter.post('/', async (request, response) => {
  const createUserService = new CreateUserService();

  try {
    const { name, email, password } = request.body;

    const user = await createUserService.execute({ name, email, password });
    return response.json(user);
  } catch (error) {
    return response.status(error.statusCode).json({ error: error.message });
  }
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const uploadAvatar = new UploadAvatarService();

    const user = await uploadAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.json(user);
  }
);
export default usersRouter;

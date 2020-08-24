import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

const directory = path.resolve(__dirname, '..', '..', 'tmp');
export default {
  directory,
  storage: multer.diskStorage({
    destination: directory,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const filename = `${fileHash}-${file.originalname}`;

      return callback(null, filename);
    },
  }),
};

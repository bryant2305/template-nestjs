import { diskStorage } from 'multer';

export const multerOptions = {
  storage: diskStorage({
    destination: './uploads', // Ruta donde se guardarán los archivos
    filename: (req, file, cb) => {
      const filename = `${Date.now()}-${file.originalname}`;
      cb(null, filename);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      // Permitir solo imágenes
      cb(null, true);
    } else {
      cb(new Error('Tipo de archivo no permitido'), false);
    }
  },
};

import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';


const routes = Router();
const upload = multer(uploadConfig);

// ROTAS
routes.get('/orfanatos', OrphanagesController.index);
routes.get('/orfanatos/:id', OrphanagesController.show);
routes.post('/orfanatos', upload.array('images'), OrphanagesController.create);

export default routes;
import { Router } from 'express';
import OrphanagesController from './controllers/OrphanagesController';


const routes = Router();

// ROTAS
routes.get('/orfanatos', OrphanagesController.index);
routes.get('/orfanatos/:id', OrphanagesController.show);
routes.post('/orfanatos', OrphanagesController.create);

export default routes;
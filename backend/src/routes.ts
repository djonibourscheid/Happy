import { Router } from 'express';
import OrphanagesController from './controllers/OrphanagesController';


const routes = Router();

// ROTAS
routes.post('/orfanatos', OrphanagesController.create);

export default routes;
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';


export default {
  // Listando todos os orfanatos
  async index(req: Request, res: Response) {
    const orphanagesRepository = getRepository(Orphanage);
    
    const orphanages = await orphanagesRepository.find();

    return res.json(orphanages);
  },

  // Detalhes de um orfanato
  async show(req: Request, res: Response) {
    const { id } = req.params;

    const orphanagesRepository = getRepository(Orphanage);
    
    const orphanage = await orphanagesRepository.findOneOrFail(id);

    return res.json(orphanage);
  },

  // Criar um orfanato
  async create(req: Request, res: Response) {
    // pegando os dados separadamente
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends
    } = req.body;

    const orphanagesRepository = getRepository(Orphanage);

    const requestImages = req.files as Express.Multer.File[];
    const images = requestImages.map(image => {
      return { path: image.filename }
    })


    // criação do orfanato
    const orphanage = orphanagesRepository.create({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images
    });

    // salvando no banco
    await orphanagesRepository.save(orphanage);

    return res.status(201).json(orphanage);
  }
};
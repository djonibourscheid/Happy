import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanages';


export default {
  // Listando todos os orfanatos
  async index(req: Request, res: Response) {
    const orphanagesRepository = getRepository(Orphanage);
    
    const orphanages = await orphanagesRepository.find();

    return res.json(orphanages);
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

    // criação do orfanato
    const orphanage = orphanagesRepository.create({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends
    });

    // salvando no banco
    await orphanagesRepository.save(orphanage);

    return res.status(201).json(orphanage);
  }
};
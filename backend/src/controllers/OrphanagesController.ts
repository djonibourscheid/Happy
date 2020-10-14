import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import orphanageView from '../views/orphanages_view';
import * as Yup from 'yup';

import Orphanage from '../models/Orphanage';


export default {
  // Listando todos os orfanatos
  async index(req: Request, res: Response) {
    const orphanagesRepository = getRepository(Orphanage);
    
    const orphanages = await orphanagesRepository.find({
      relations: ['images']
    });

    return res.json(orphanageView.renderMany(orphanages));
  },

  // Detalhes de um orfanato
  async show(req: Request, res: Response) {
    const { id } = req.params;

    const orphanagesRepository = getRepository(Orphanage);
    
    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images']
    });

    return res.json(orphanageView.render(orphanage));
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
    });


    // Validação dos campos preenchidos
    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required()
        })
      )
    });

    await schema.validate(data, {
      abortEarly: false
    });
    
    
    // criação do orfanato
    const orphanage = orphanagesRepository.create(data);

    // salvando no banco
    await orphanagesRepository.save(orphanage);

    return res.status(201).json(orphanage);
  }
};
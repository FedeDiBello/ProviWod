import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Plan } from '../entities/Plan';
import { User } from '../entities/User';

export const createPlan = async (req: Request, res: Response) => {
  const { title, type, content, imageUrl } = req.body;
  const userId = (req as any).user.id;

  const userRepo = AppDataSource.getRepository(User);
  const planRepo = AppDataSource.getRepository(Plan);

  const coach = await userRepo.findOneBy({ id: userId });
  if (!coach) return res.status(404).json({ msg: 'Coach not found' });

  const plan = planRepo.create({ title, type, content, imageUrl, coach });
  await planRepo.save(plan);

  res.status(201).json(plan);
};

export const getPlans = async (_: Request, res: Response) => {
  const plans = await AppDataSource.getRepository(Plan).find({ relations: ['coach'] });
  res.json(plans);
};
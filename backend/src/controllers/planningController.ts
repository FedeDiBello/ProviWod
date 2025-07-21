import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export const createPlan = async (req: Request, res: Response) => {
  const { name, image, type } = req.body;
  const userId = req.userId;

  try {
    const plan = await prisma.plan.create({
      data: {
        name,
        image,
        type,
        userId
      },
    });
    return res.status(201).json(plan);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to create plan' });
  }
};

export const getPlans = async (req: Request, res: Response) => {
  const userId = req.userId;

  const plans = await prisma.plan.findMany({
    where: { userId },
    include: { weeks: { include: { days: { include: { sections: true } } } } }
  });

  return res.json(plans);
};

export const getPlanById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const plan = await prisma.plan.findUnique({
    where: { id },
    include: { weeks: { include: { days: { include: { sections: true } } } } }
  });

  if (!plan) return res.status(404).json({ error: 'Plan not found' });
  return res.json(plan);
};

export const publishPlan = async (req: Request, res: Response) => {
  const { id } = req.params;
  const plan = await prisma.plan.update({
    where: { id },
    data: { isPublished: true },
  });
  return res.json({ message: 'Plan published', plan });
};
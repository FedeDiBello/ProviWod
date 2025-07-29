import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userRepo = AppDataSource.getRepository(User);

  const exists = await userRepo.findOne({ where: { email } });
  if (exists) return res.status(400).json({ msg: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = userRepo.create({ email, password: hashedPassword });
  await userRepo.save(user);

  // Acá podrías enviar mail de verificación
  res.status(201).json({ msg: 'User registered' });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userRepo = AppDataSource.getRepository(User);

  const user = await userRepo.findOne({ where: { email } });
  if (!user) return res.status(404).json({ msg: 'User not found' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ msg: 'Invalid password' });

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '1d' });
  res.json({ token });
};

export const verifyEmail = async (_: Request, res: Response) => {
  // Mecanismo ficticio
  res.send('Verificación por mail no implementada aún.');
};
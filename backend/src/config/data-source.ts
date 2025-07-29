import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Plan } from '../entities/Plan';
import * as dotenv from 'dotenv';

// Cargar variables del .env
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // ⚠️ Solo para desarrollo. En producción, poner en false.
  logging: false,
  entities: [User, Plan],
  migrations: [],
  subscribers: [],
});
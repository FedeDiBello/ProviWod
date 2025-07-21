import express from 'express';
import {
  createPlan,
  getPlans,
  getPlanById,
  publishPlan
} from '../controllers/planningController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

router.use(authenticate);

router.post('/', createPlan);
router.get('/', getPlans);
router.get('/:id', getPlanById);
router.post('/:id/publish', publishPlan);

export default router;
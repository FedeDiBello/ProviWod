import { Router } from 'express';
import { createPlan, getPlans } from '../controllers/plan.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authMiddleware, createPlan);
router.get('/', getPlans);

export default router;
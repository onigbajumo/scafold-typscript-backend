// src/routes/user.route.ts
import { Router } from 'express';
import { getUsers } from '../controllers/user.controller';

const router = Router();

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: List users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/', getUsers);

export default router;

import { Router } from 'express';
import { getUsers, createUser } from '../controllers/user.controller';

const router = Router();

/**
 * @openapi
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: ["Users"]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post('/', createUser);

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: ["Users"]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 */
router.get('/', getUsers);

export default router;

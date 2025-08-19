
// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import { db } from '../config/db';
import { users } from '../db/schema';

export const getUsers = async (_: Request, res: Response) => {
  const result = await db.select().from(users);
  res.json(result);
};

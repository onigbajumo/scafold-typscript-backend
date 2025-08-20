

import { Request, Response } from 'express';
import { db } from '../config/db';
import { users } from '../db/schema/user.schema';
import { logger } from '../config/logger';

export const createUser = async (req: Request, res: Response) => {
  try {
    logger.debug('Creating users...');
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    const [newUser] = await db.insert(users).values({ name, email }).returning();

    return res.status(201).json(newUser);
  } catch (error: any) {
    logger.error('Error creating user', { error: error.message });
    return res.status(500).json({ error: error.message });
  }
};

export const getUsers = async (_: Request, res: Response) => {
  try {
    logger.debug('Fetching users...');
    // Fetch all users from the database    
    const result = await db.select().from(users);
    res.json(result);
  } catch (error: any) {
    logger.error('Error fetching users', { error: error.message });
    res.status(500).json({ error: 'Internal Server Error' });
    
  }

};


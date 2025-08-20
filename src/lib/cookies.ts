
import { Response } from 'express';

export const setAuthCookie = (res: Response, token: string) => {
  res.cookie('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  });
};

export const clearAuthCookie = (res: Response) => {
  res.clearCookie('auth_token');
};

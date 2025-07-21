import { NextFunction, Request, Response } from 'express';

export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction): void {
  const message = err instanceof Error ? err.message : String(err);
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error', details: message });
}

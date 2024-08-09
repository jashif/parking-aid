import { Request, Response, NextFunction } from "express";
/*eslint-disable */
type ExpressMiddleware = (req: Request, res: Response, next: NextFunction) => Promise<void>;

const asyncErrorMiddleware =
  (middleware: ExpressMiddleware) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await middleware(req, res, next);
    } catch (err: unknown) {
      next(err);
    }
  };

export { asyncErrorMiddleware };

import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class GloballoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const date = new Date();
    console.log(
      `[${date}], Se está usando el metodo: ${req.method.toUpperCase()} en la ruta: ${req.originalUrl}`,
    );
    next();
  }
}

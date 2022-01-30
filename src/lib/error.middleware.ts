import { NextFunction, Request, Response } from 'express';
import { isString } from '@nestjs/common/utils/shared.utils';
import { HttpException, HttpStatus } from '@nestjs/common';

export function errorMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.query?.error && isString(req.query?.error)) {
    const error = parseFloat(req.query?.error);

    if (error && !isNaN(error)) {
      if (Math.random() < error) {
        throw new HttpException(
          'Dummy error thrown!',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  next();
}

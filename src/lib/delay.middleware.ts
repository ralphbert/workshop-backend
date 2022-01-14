import { NextFunction, Request, Response } from "express";
import { isString } from "@nestjs/common/utils/shared.utils";

export function delayMiddleware(req: Request, res: Response, next: NextFunction) {
  let delayTime = 0;

  if (req.query?.delay && isString(req.query?.delay)) {
    const parts = req.query.delay.split(",");

    if (parts.length) {
      delayTime = parseFloat(parts[0]);

      if (parts[1]) {
        delayTime += Math.random() * parseFloat(parts[1]);
      }

      setTimeout(() => next(), delayTime);
      return;
    }
  }

  next();
}

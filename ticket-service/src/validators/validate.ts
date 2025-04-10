import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export function validateDto<T>(dtoClass: new (data: Partial<T>) => T) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObject = plainToInstance<T, Object>(dtoClass, req.body);
    const errors = await validate(dtoObject, {
      whitelist: true,
      forbidNonWhitelisted: true,
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      const errorMessages = errors
        .map((err) => Object.values(err.constraints || {}))
        .flat();

      res.status(400).json({
        code: 1,
        message: `validation failed ${errorMessages}`,
        data: null,
      });

      return;
    }

    req.body = dtoObject;
    next();
  };
}

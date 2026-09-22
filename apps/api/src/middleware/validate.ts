import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

type SchemaMap = {
  body?: ZodType;
  query?: ZodType;
  params?: ZodType;
};

export function validate(schemas: SchemaMap) {
  return (req: Request, _res: Response, next: NextFunction) => {
    for (const source of ["body", "query", "params"] as const) {
      const schema = schemas[source];
      if (!schema) {
        continue;
      }
      const result = schema.safeParse(req[source]);
      if (!result.success) {
        next(result.error);
        return;
      }
      if (source === "body") {
        req.body = result.data;
      } else if (source === "query") {
        req.query = result.data as Request["query"];
      } else {
        req.params = result.data as Request["params"];
      }
    }
    next();
  };
}
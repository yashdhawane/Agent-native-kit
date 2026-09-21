import { z } from "zod";

export function validate<T extends z.ZodType>(
  schema: T,
  data: unknown,
): z.output<T> {
  return schema.parse(data);
}
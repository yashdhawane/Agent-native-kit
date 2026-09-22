import { prisma } from "@repo/db";
import { ApiError } from "../lib/errors.js";
import type { UpdateProfileInput } from "../contracts/profile.schema.js";

export async function updateProfile(
  userId: string,
  input: UpdateProfileInput,
) {
  const exists = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true },
  });
  if (!exists) {
    throw new ApiError(404, "NOT_FOUND", "User not found");
  }

  return prisma.user.update({
    where: { id: userId },
    data: {
      ...(input.name !== undefined ? { name: input.name } : {}),
    },
  });
}
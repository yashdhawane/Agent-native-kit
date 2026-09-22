import { z } from "zod";

export const UserPublicSchema = z.object({
  id: z.string(),
  email: z.email(),
  name: z.string().nullable(),
  emailVerified: z.boolean(),
  image: z.string().nullable(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export type UserPublic = z.infer<typeof UserPublicSchema>;

export const SessionPublicSchema = z.object({
  id: z.string(),
  expiresAt: z.iso.datetime(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  ipAddress: z.string().nullable(),
  userAgent: z.string().nullable(),
  userId: z.string(),
});

export type SessionPublic = z.infer<typeof SessionPublicSchema>;

export const MeResponseSchema = z.object({
  user: UserPublicSchema,
  session: SessionPublicSchema,
});

export type MeResponse = z.infer<typeof MeResponseSchema>;

function toIso(value: Date | string): string {
  return value instanceof Date ? value.toISOString() : value;
}

export function toUserPublic(user: {
  id: string;
  email: string;
  name: string | null;
  emailVerified: boolean;
  image: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}): UserPublic {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    emailVerified: user.emailVerified,
    image: user.image,
    createdAt: toIso(user.createdAt),
    updatedAt: toIso(user.updatedAt),
  };
}

export function toSessionPublic(session: {
  id: string;
  expiresAt: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
  ipAddress: string | null;
  userAgent: string | null;
  userId: string;
}): SessionPublic {
  return {
    id: session.id,
    expiresAt: toIso(session.expiresAt),
    createdAt: toIso(session.createdAt),
    updatedAt: toIso(session.updatedAt),
    ipAddress: session.ipAddress,
    userAgent: session.userAgent,
    userId: session.userId,
  };
}
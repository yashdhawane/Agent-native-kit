import { redis } from "./client.js";

export async function get<T>(key: string): Promise<T | null> {
  return redis.get<T>(key);
}

export async function set<T>(
  key: string,
  value: T,
  expirationSeconds?: number,
): Promise<void> {
  if (expirationSeconds !== undefined) {
    await redis.set(key, value, {
      ex: expirationSeconds,
    });
    return;
  }

  await redis.set(key, value);
}

export async function del(key: string): Promise<void> {
  await redis.del(key);
}

export async function exists(key: string): Promise<boolean> {
  return (await redis.exists(key)) === 1;
}
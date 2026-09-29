import { cloudinary } from "./client.js";

export type GetUrlInput = {
  publicId: string;
  resourceType?: "image" | "video" | "raw";
};

export function getUrl(input: GetUrlInput): string {
  return cloudinary.url(input.publicId, {
    resource_type: input.resourceType ?? "image",
    secure: true,
  });
}
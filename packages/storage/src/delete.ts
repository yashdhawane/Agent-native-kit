import { cloudinary } from "./client.js";

export type DeleteInput = {
  publicId: string;
  resourceType?: "image" | "video" | "raw";
};

export async function deleteAsset(input: DeleteInput): Promise<void> {
  await cloudinary.uploader.destroy(input.publicId, {
    resource_type: input.resourceType ?? "image",
    invalidate: true,
  });
}
import { cloudinary } from "./client.js";

export type UploadInput = {
  file: string | Buffer;
  folder?: string;
  publicId?: string;
  resourceType?: "image" | "video" | "raw" | "auto";
};

export type UploadResult = {
  publicId: string;
  secureUrl: string;
  resourceType: string;
  format: string | undefined;
  bytes: number;
};

export async function upload(input: UploadInput): Promise<UploadResult> {
  const options = {
    folder: input.folder,
    public_id: input.publicId,
    resource_type: input.resourceType ?? "auto",
  };

  const result =
    typeof input.file === "string"
      ? await cloudinary.uploader.upload(input.file, options)
      : await new Promise<Awaited<ReturnType<typeof cloudinary.uploader.upload>>>(
          (resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              options,
              (error, result) => {
                if (error) {
                  reject(error);
                  return;
                }

                if (!result) {
                  reject(new Error("Cloudinary upload returned no result"));
                  return;
                }

                resolve(result);
              },
            );

            stream.end(input.file);
          },
        );

  return {
    publicId: result.public_id,
    secureUrl: result.secure_url,
    resourceType: result.resource_type,
    format: result.format,
    bytes: result.bytes,
  };
}
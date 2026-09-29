import {
  deleteAsset,
  getUrl,
  upload,
  type UploadInput,
} from "@repo/storage";

export async function uploadFile(input: UploadInput) {
  return upload(input);
}

export async function deleteFile(publicId: string) {
  return deleteAsset({ publicId });
}

export function getFileUrl(publicId: string) {
  return getUrl({ publicId });
}
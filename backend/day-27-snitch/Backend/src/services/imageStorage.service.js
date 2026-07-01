import ImageKit from "@imagekit/nodejs";
import config from "../config/config.js";
import multer from "multer";

const client = new ImageKit({
  privateKey: config.IMAGEKIT_PRIVATE_KEY,
});

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, //10MB
  },
});

export async function uploadFile({ buffer, fileName, folder = "Lumiere" }) {
  const result = await client.files.upload({
    file: await ImageKit.toFile(buffer),
    fileName,
    folder,
  });
  return result;
}

export async function uploadFiles(files) {
  if (!files || files.length === 0) {
    return [];
  }

  return Promise.all(
    files.map((file) =>
      uploadFile({
        buffer: file.buffer,
        fileName: file.originalname,
      }),
    ),
  );
}

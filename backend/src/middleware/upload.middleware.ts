import multer from "multer";

import { BadRequestError } from "../errors/BadRequestError.js";

const storage =
  multer.memoryStorage();

export const uploadAvatar =
  multer({
    storage,

    limits: {
      fileSize:
        2 * 1024 * 1024,
    },

    fileFilter: (
      _req,
      file,
      callback
    ) => {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
      ];

      if (
        !allowedTypes.includes(
          file.mimetype
        )
      ) {
        callback(
          new BadRequestError(
            "Avatar must be a JPG, PNG or WebP image"
          )
        );

        return;
      }

      callback(null, true);
    },
  });
import {
  supabase,
} from "../../../lib/supabase.js";

export async function uploadAvatarImage(
  buffer: Buffer,
  userId: string,
  mimetype: string
): Promise<string> {
  const extension =
    mimetype === "image/png"
      ? "png"
      : mimetype === "image/webp"
        ? "webp"
        : "jpg";

  const filePath =
    `${userId}/avatar.${extension}`;

  const {
    error,
  } =
    await supabase.storage
      .from("avatars")
      .upload(
        filePath,
        buffer,
        {
          contentType:
            mimetype,

          upsert: true,
        }
      );

  if (error) {
    throw new Error(
      `Avatar upload failed: ${error.message}`
    );
  }

  const {
    data,
  } =
    supabase.storage
      .from("avatars")
      .getPublicUrl(
        filePath
      );

  return data.publicUrl;
}

export async function deleteAvatarImage(
  userId: string
): Promise<void> {
  const extensions = [
    "jpg",
    "png",
    "webp",
  ];

  const paths = extensions.map(
    (extension) =>
      `${userId}/avatar.${extension}`
  );

  const { error } =
    await supabase.storage
      .from("avatars")
      .remove(paths);

  if (error) {
    throw new Error(
      `Could not delete avatar: ${error.message}`
    );
  }
}
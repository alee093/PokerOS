import { prisma } from "../../lib/prisma.js";

import { ConflictError } from "../../errors/ConflictError.js";
import { NotFoundError } from "../../errors/NotFoundError.js";
import {
  uploadAvatarImage,
  deleteAvatarImage,
} from "./services/avatar.service.js";


import type {
  UpdateUserInput,
} from "./user.schema.js";

export async function getCurrentUser(
  userId: string
) {
  const user =
    await prisma.user.findUnique({
      where: {
        id: userId,
      },

      select: {
        id: true,
        username: true,
        email: true,
        emailVerified: true,
        avatarUrl: true,
        country: true,
        timezone: true,
        currency: true,
        createdAt: true,
      },
    });

  if (!user) {
    throw new NotFoundError(
      "User not found"
    );
  }

  return user;
}

export async function updateCurrentUser(
  userId: string,
  data: UpdateUserInput
) {
  if (data.username) {
    const existingUsername =
      await prisma.user.findFirst({
        where: {
          username: data.username,
          NOT: {
            id: userId,
          },
        },
      });

    if (existingUsername) {
      throw new ConflictError(
        "This username is already taken"
      );
    }
  }

  const user =
    await prisma.user.update({
      where: {
        id: userId,
      },

      data: {
        ...(data.username !== undefined && {
          username: data.username,
        }),

        ...(data.avatarUrl !== undefined && {
          avatarUrl: data.avatarUrl,
        }),

        ...(data.country !== undefined && {
          country: data.country,
        }),

        ...(data.timezone !== undefined && {
          timezone: data.timezone,
        }),

        ...(data.currency !== undefined && {
          currency: data.currency,
        }),
      },

      select: {
        id: true,
        username: true,
        email: true,
        avatarUrl: true,
        country: true,
        timezone: true,
        currency: true,
      },
    });

  return user;
}

export async function deleteCurrentUser(
  userId: string
) {
  const user =
    await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

  if (!user) {
    throw new NotFoundError(
      "User not found"
    );
  }

  if (user.avatarUrl) {
    await deleteAvatarImage(
      userId
    );
  }

  await prisma.user.delete({
    where: {
      id: userId,
    },
  });
}
export async function updateUserAvatar(
  userId: string,
  file: Express.Multer.File
) {
  const avatarUrl =
    await uploadAvatarImage(
      file.buffer,
      userId,
      file.mimetype
    );

  return prisma.user.update({
    where: {
      id: userId,
    },

    data: {
      avatarUrl,
    },

    select: {
      id: true,
      username: true,
      email: true,
      avatarUrl: true,
      country: true,
      timezone: true,
      currency: true,
    },
  });
}

export async function removeUserAvatar(
  userId: string
) {
  const user =
    await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

  if (!user) {
    throw new NotFoundError(
      "User not found"
    );
  }

  if (user.avatarUrl) {
    await deleteAvatarImage(
      userId
    );
  }

  return prisma.user.update({
    where: {
      id: userId,
    },

    data: {
      avatarUrl: null,
    },

    select: {
      id: true,
      username: true,
      email: true,
      avatarUrl: true,
      country: true,
      timezone: true,
      currency: true,
    },
  });
}
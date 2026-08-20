import type {
  Request,
  Response,
} from "express";

import { asyncHandler } from "../../utils/asyncHandler.js";

import {
  clearAuthCookie,
} from "../../utils/auth-cookie.js";

import {
  updateUserSchema,
} from "./user.schema.js";

import {
  deleteCurrentUser,
  getCurrentUser,
  updateCurrentUser,
  removeUserAvatar,
} from "./user.service.js";

import {
  updateUserAvatar,
} from "./user.service.js";

import {
  BadRequestError,
} from "../../errors/BadRequestError.js";

export const me = asyncHandler(
  async (
    req: Request,
    res: Response
  ) => {
    const user =
      await getCurrentUser(
        req.user!.id
      );

    res.json(user);
  }
);

export const updateMe = asyncHandler(
  async (
    req: Request,
    res: Response
  ) => {
    const data =
      updateUserSchema.parse(
        req.body
      );

    const user =
      await updateCurrentUser(
        req.user!.id,
        data
      );

    res.json(user);
  }
);

export const deleteMe = asyncHandler(
  async (
    req: Request,
    res: Response
  ) => {
    await deleteCurrentUser(
      req.user!.id
    );

    clearAuthCookie(res);

    res.sendStatus(204);
  }
);

export const uploadAvatarController =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      if (!req.file) {
        throw new BadRequestError(
          "Please select an image"
        );
      }

      const user =
        await updateUserAvatar(
          req.user!.id,
          req.file
        );

      res.json(user);
    }
  );

export const removeAvatarController =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const user =
        await removeUserAvatar(
          req.user!.id
        );

      res.json(user);
    }
  );
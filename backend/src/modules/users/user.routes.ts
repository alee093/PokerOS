import { Router } from "express";

import {
  authMiddleware,
} from "../../middleware/auth.middleware.js";

import {
  uploadAvatar,
} from "../../middleware/upload.middleware.js";

import {
  deleteMe,
  me,
  updateMe,
  uploadAvatarController,
  removeAvatarController,
} from "./user.controller.js";

const router = Router();

router.get(
  "/me",
  authMiddleware,
  me
);

router.patch(
  "/me",
  authMiddleware,
  updateMe
);

router.delete(
  "/me",
  authMiddleware,
  deleteMe
);

router.post(
  "/me/avatar",
  authMiddleware,
  uploadAvatar.single("avatar"),
  uploadAvatarController
);

router.delete(
  "/me/avatar",
  authMiddleware,
  removeAvatarController
);

export default router;
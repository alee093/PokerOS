import { api } from "./api";

import type {
  UpdateUserInput,
  UserProfile,
} from "../types/user";

export async function getCurrentUser(): Promise<UserProfile> {
  const response =
    await api.get<UserProfile>(
      "/users/me"
    );

  return response.data;
}

export async function updateCurrentUser(
  data: UpdateUserInput
): Promise<UserProfile> {
  const response =
    await api.patch<UserProfile>(
      "/users/me",
      data
    );

  return response.data;
}

export async function deleteCurrentUser(): Promise<void> {
  await api.delete("/users/me");
}

export async function uploadAvatar(
  file: File
): Promise<UserProfile> {
  const formData = new FormData();

  formData.append(
    "avatar",
    file
  );

  const response =
    await api.post<UserProfile>(
      "/users/me/avatar",
      formData
    );

  return response.data;
}

export async function removeAvatar(): Promise<UserProfile> {
  const response =
    await api.delete<UserProfile>(
      "/users/me/avatar"
    );

  return response.data;
}
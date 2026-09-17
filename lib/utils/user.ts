import type { IUser } from "@/lib/models/user";

export function toPublicUser(user: IUser) {
  const obj = user.toObject ? user.toObject() : user;
  const publicUser = { ...obj } as Record<string, unknown>;
  delete publicUser.password;
  return publicUser;
}
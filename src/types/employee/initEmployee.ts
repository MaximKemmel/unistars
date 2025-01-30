import { IUser } from "../user/user";

export function initEmployee(): IUser {
  const defaults = {
    fullName: "",
    email: "",
    permissions: ["EDIT_USER_PROFILE"],
    profession: "",
  };

  return {
    ...defaults,
  };
}

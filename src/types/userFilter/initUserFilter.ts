import { IUserFilter } from "./userFilter";

export function initUserFilter(): IUserFilter {
  const defaults = {
    isCompleted: false,
    sex: -1,
    ageRange: -1,
    citizenship: -1,
  };

  return {
    ...defaults,
  };
}

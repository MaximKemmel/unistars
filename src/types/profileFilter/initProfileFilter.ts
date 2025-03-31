import { IProfileFilter } from "./profileFilter";

export function initProfileFilter(): IProfileFilter {
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

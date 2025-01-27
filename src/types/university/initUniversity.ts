import { IUniversity } from "./university";

export function initUniversity(): IUniversity {
  const defaults = {
    name: "",
    description: "",
    foundation: "",
    userCountries: [],
    userEmail: "",
  };

  return {
    ...defaults,
  };
}

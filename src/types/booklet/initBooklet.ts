import { IBooklet } from "./booklet";

export function initBooklet(): IBooklet {
  const defaults = {
    id: -1,
    title: "",
    description: "",
    imageUrl: "",
    bookletFileUrl: "",
  };

  return {
    ...defaults,
  };
}

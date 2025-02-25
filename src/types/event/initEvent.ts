import { IEvent } from "./event";

export function initEvent(): IEvent {
  const defaults = {
    id: -1,
    name: "",
    description: "",
    link: "",
    address: "",
    startDate: "",
  };

  return {
    ...defaults,
  };
}

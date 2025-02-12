import { IEvent } from "./event";

export function initEvent(): IEvent {
  const defaults = {
    id: -1,
    name: "",
    link: "",
    address: "",
  };

  return {
    ...defaults,
  };
}

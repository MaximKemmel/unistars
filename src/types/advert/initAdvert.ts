import { IAdvert } from "./advert";

export function initAdvert(): IAdvert {
  const defaults = {
    id: -1,
    title: "",
    subtitle: "",
    email: "",
    universityId: -1,
    description: "",
    imageUrl: "",
    websiteUrl: "",
    startDate: new Date("01.01.1900"),
    endDate: new Date("01.01.1900"),
    screenDestination: ["engage_screen"],
  };

  return {
    ...defaults,
  };
}

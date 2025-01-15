import { IAdvert } from "./advert";

export function initAdvert(): IAdvert {
  const defaults = {
    id: -1,
    title: "",
    subtitle: "",
    universityId: -1,
    description: "",
    imageUrl: "",
    websiteUrl: "",
    startDate: new Date(),
    endDate: new Date(),
    screenDestination: [],
  };

  return {
    ...defaults,
  };
}

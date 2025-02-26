import { IAdvert } from "./advert";

export interface IAdvertRequest {
  id?: number;
  isRejected?: boolean;
  descriptionReject?: string;
  communicationEmail?: string;
  communicationPhone?: string;
  advertising?: IAdvert;
}

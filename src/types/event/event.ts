import { IGeoLocation } from "../local/geoLocation";
import { IEventType } from "./eventType";

export interface IEvent {
  id: number;
  universityId?: number;
  universityShortName?: string;
  universityFullName?: string;
  universityLogoUrl?: string;
  geolocation?: IGeoLocation;
  startDate?: string;
  address?: string;
  link?: string;
  coverUrl?: string;
  additionalUrl?: string;
  eventModerators?: number[];
  eventSubscribers?: number[];
  name?: string;
  description?: string;
  chatId?: number;
  enabledChat?: boolean;
  editAccessUsers?: number[];
  removeAccessUsers?: number[];
  privacy?: string[];
  subscriber?: boolean;
  eventType?: IEventType;
}

import { IAmbassadorRequest } from "./ambassadorRequest";
import { IConfirmedApplicantRequest } from "./confirmedApplicantRequest";
import { ICountry } from "../core/country";
import { ICity } from "../core/city";
import { ILanguageOfInstruction } from "./languageOfInstruction";
import { IAmenity } from "./amenity";
import { IFileStorage } from "./fileStorage";
import { IUniversityTypeOfDegree } from "./universityTypeOfDegree";
import { IConfirmedApplicantId } from "../local/confirmedApplicantId";
import { IGeoLocation } from "../local/geoLocation";
import { IAmbassadorId } from "../local/ambassadorId";
import { statusPartnership } from "../../enums/dto/statusPartnership";

export interface IUniversity {
  type?: string;
  id?: number;
  name?: string;
  information?: string;
  foundation?: Date;
  shortDescription?: string;
  faqLink?: string;
  photo?: string;
  description?: string;
  shortName?: string;
  logoUrl?: string;
  coverUrl?: string;
  costOfEducationMin?: number;
  costOfEducationMax?: number;
  universityLink?: string;
  geoLocation?: IGeoLocation;
  verified?: boolean;
  ambassadorIds?: IAmbassadorId[];
  ambassadorRequests?: IAmbassadorRequest[];
  confirmedApplicantIds?: IConfirmedApplicantId[];
  confirmedApplicantRequests?: IConfirmedApplicantRequest[];
  studentIds?: number[];
  subscriberUserIds?: number[];
  subscriberStudentsIds?: number[];
  subscriberUniversitiesIds?: number[];
  userId?: number;
  userEmail?: string;
  password?: string;
  userCreatedAt?: Date;
  userCountries?: ICountry[];
  userCity?: ICity;
  numberEmployees?: number;
  userLanguages?: ILanguageOfInstruction[];
  street?: string; //TODO: 50 символов
  houseNumber?: number; //TODO: 10 символов
  letter?: string; //TODO: 3 символа
  admission?: string; //TODO: 255 символов
  careers?: string; //TODO: 500 символов
  phoneNumberBody?: string; //TODO: 20 символов
  phoneNumberCountryPrefix?: string; //TODO: 6 символов
  amenities?: IAmenity[];
  standGalleryImages?: IFileStorage[];
  universityTypeOfDegrees?: IUniversityTypeOfDegree[];
  statusPartnership?: statusPartnership;
}

import { ICity } from "../core/city";
import { ICountry } from "../core/country";
import { ILanguage } from "../core/language";
import { IStatus } from "../core/status";
import { IUniversity } from "../university/university";

export interface IUser {
  id: number;
  type: string;
  ambassador: boolean;
  student: boolean;
  employee: boolean;
  applicant: boolean;
  graduate: boolean;
  universityAmbassador: number;
  email: string;
  fullName: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  city: ICity;
  userCountries: ICountry[];
  description: string;
  languages: ILanguage[];
  primaryUniversityId: number;
  primaryUniversity: IUniversity;
  registrationDate: string;
  specialization: string;
  universitySubscribe: number[];
  confirmedApplicant: boolean;
  status: IStatus;
  birthday: Date;
}

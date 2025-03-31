import { IPersonalData } from "./personalData";
import { IEducation } from "./education";
import { IEducationPreferences } from "./educationPreferences";

export interface IStudentProfile {
  avatar: string;
  fullName: string;
  personalData: IPersonalData;
  education: IEducation;
  educationPreferences: IEducationPreferences;
  ambassador: boolean;
  profileFilled: boolean;
}

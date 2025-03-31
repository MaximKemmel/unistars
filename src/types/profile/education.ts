import { IPastEducation } from "./pastEducation";

export interface IEducation {
  currentUniversity: string;
  pastEducations: IPastEducation[];
  desiredEducationLevel: string;
}

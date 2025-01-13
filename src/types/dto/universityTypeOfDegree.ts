export interface IUniversityTypeOfDegree {
  universityId?: number;
  typeOfDegreeId?: number;
  studyDuration?: number;
  minCost?: number;
  maxCost?: number;
  programLink?: string; //TODO: 255 символов
  quotasDescriptionLink?: string; //TODO: 255 символов
  formOfEducationIds?: number[];
  languageOfInstructionIds?: number[];
  quotasAndDiscountIds?: number[];
  specializationIds?: number[];
}
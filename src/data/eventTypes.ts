import { IEventType } from "../types/local/eventType";

export const eventTypes = [
  {
    id: 0,
    type: "Образовательное мероприятие",
    type_eng: "Educational event"
  } as IEventType,
  {
    id: 1,
    type: "Внеучебная деятельность",
    type_eng: "Extracurricular activities"
  } as IEventType,
  {
    id: 2,
    type: "День открытых дверей",
    type_eng: "Open House Day"
  } as IEventType,
  {
    id: 3,
    type: "Адаптация",
    type_eng: "Adaptation"
  } as IEventType,
  {
    id: 4,
    type: "Набор студентов",
    type_eng: "Student recruitment"
  } as IEventType,
  {
    id: 5,
    type: "Карьерное развитие и стажировки",
    type_eng: "Career development and internships"
  } as IEventType,
  {
    id: 6,
    type: "Культурный обмен и международная мобильность",
    type_eng: "Cultural exchange and international mobility"
  } as IEventType,
] as IEventType[];

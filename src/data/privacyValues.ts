import { IEventPrivacy } from "../types/event/eventPrivacy";

export const privacyValues = [
  {
    id: 0,
    name: "Всем пользователям приложения",
    nameEnglish: "All users in the app",
    roles: [
      "AMBASSADOR",
      "APPLICANT",
      "ALL_CONFIRMED_APPLICANT",
      "ALL_STUDENT",
      "SUBSCRIBER",
    ],
  },
  {
    id: 1,
    name: "Только вашим подписчикам",
    nameEnglish: "Only to your subscribers",
    roles: ["SUBSCRIBER"],
  },
] as IEventPrivacy[];

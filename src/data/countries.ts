import { ICountry } from "../types/dto/country";

export const countries = [
  {
    id: 0,
    name: "Россия",
    nameEnglish: "Russia",
    nativeName: "RUSSIA",
    language: ["Russian"],
  } as ICountry,
  {
    id: 1,
    name: "США",
    nameEnglish: "USA",
    nativeName: "USA",
    language: ["English"],
  } as ICountry,
] as ICountry[];
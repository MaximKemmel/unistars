import { IEmployeeRight } from "../types/employee/employeeRight";

export const employeeRights = [
  {
    id: 0,
    name: "Редактирование профиля организации",
    nameEnglish: "Editing an organization's profile",
    type: "EDIT_USER_PROFILE",
    isSelected: false,
  } as IEmployeeRight,
  {
    id: 1,
    name: "Создание и редактирование мероприятий",
    nameEnglish: "Creating and editing events",
    type: "CREATE_AND_EDIT_EVENTS",
    isSelected: false,
  } as IEmployeeRight,
  {
    id: 2,
    name: "Создание и редактирование статей",
    nameEnglish: "Creating and editing articles",
    type: "CREATE_AND_EDIT_ARTICLES",
    isSelected: false,
  } as IEmployeeRight,
  {
    id: 3,
    name: "Принимать личные сообщения из списка сотрудников",
    nameEnglish: "Accept private messages from the list of employees",
    type: "EDIT_USER_PROFILE",
    isSelected: false,
  } as IEmployeeRight,
] as IEmployeeRight[];

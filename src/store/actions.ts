import * as coreActionsDb from "./core/core.actions";
import { actions as adminActions } from "./admin/admin.slice";
import * as adminActionsDb from "./admin/admin.actions";
import { actions as universityActions } from "./university/university.slice";
import * as universityActionsDb from "./university/university.actions";
import { actions as subscriberActions } from "./subscriber/subscriber.slice";
import * as subscriberActionsDb from "./subscriber/subscriber.actions";
import { actions as studentActions } from "./student/student.slice";
import * as studentActionsDb from "./student/student.actions";
import { actions as ambassadorActions } from "./ambassador/ambassador.slice";
import * as ambassadorActionsDb from "./ambassador/ambassador.actions";
import { actions as employeeActions } from "./employee/employee.slice";
import * as employeeActionsDb from "./employee/employee.actions";
import { actions as bookletActions } from "./booklet/booklet.slice";
import * as bookletActionsDb from "./booklet/booklet.actions";
import { actions as advertActions } from "./advert/advert.slice";
import * as advertActionsDb from "./advert/advert.actions";
import { actions as eventActions } from "./event/event.slice";
import * as eventActionsDb from "./event/event.actions";

export const rootActions = {
  ...coreActionsDb,
  ...adminActions,
  ...adminActionsDb,
  ...universityActions,
  ...universityActionsDb,
  ...subscriberActions,
  ...subscriberActionsDb,
  ...studentActions,
  ...studentActionsDb,
  ...ambassadorActions,
  ...ambassadorActionsDb,
  ...employeeActions,
  ...employeeActionsDb,
  ...bookletActions,
  ...bookletActionsDb,
  ...advertActions,
  ...advertActionsDb,
  ...eventActions,
  ...eventActionsDb,
};

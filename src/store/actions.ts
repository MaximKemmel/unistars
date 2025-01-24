import * as coreActionsDb from "./core/core.actions";
import { actions as adminActions } from "./admin/admin.slice";
import * as adminActionsDb from "./admin/admin.actions";
import { actions as bookletActions } from "./booklet/booklet.slice";
import * as bookletActionsDb from "./booklet/booklet.actions";
import { actions as advertActions } from "./advert/advert.slice";
import * as advertActionsDb from "./advert/advert.actions";
import * as eventActionsDb from "./event/event.actions";

export const rootActions = {
  ...coreActionsDb,
  ...adminActions,
  ...adminActionsDb,
  ...bookletActions,
  ...bookletActionsDb,
  ...advertActions,
  ...advertActionsDb,
  ...eventActionsDb,
};

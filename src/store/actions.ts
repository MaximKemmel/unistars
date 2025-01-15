import * as coreActionsDb from "./core/core.actions";
import { actions as bookletActions } from "./booklet/booklet.slice";
import * as bookletActionsDb from "./booklet/booklet.actions";
import { actions as advertActions } from "./advert/advert.slice";
import * as advertActionsDb from "./advert/advert.actions";
import * as eventActionsDb from "./event/event.actions";

export const rootActions = {
  ...coreActionsDb,
  ...bookletActions,
  ...bookletActionsDb,
  ...advertActions,
  ...advertActionsDb,
  ...eventActionsDb,
};

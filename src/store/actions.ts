import * as coreActionsDb from "./core/core.actions";
import { actions as bookletActions } from "./booklet/booklet.slice";
import * as bookletActionsDb from "./booklet/booklet.actions";

export const rootActions = {
  ...coreActionsDb,
  ...bookletActions,
  ...bookletActionsDb,
};

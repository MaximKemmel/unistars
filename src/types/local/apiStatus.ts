import { ApiStatusType } from "../../enums/local/apiStatusType";

export interface IApiStatus {
  status: ApiStatusType;
  error?: string;
}

export function initApiStatus(): IApiStatus {
  const defaults = {
    status: ApiStatusType.NONE,
  } as IApiStatus;

  return {
    ...defaults,
  };
}

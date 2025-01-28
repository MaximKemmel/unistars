import { useTypedSelector } from "./useTypedSelector";

export function useAuth() {
  const isAuth = useTypedSelector((state) => state.adminReducer.isAuth);
  return isAuth;
}

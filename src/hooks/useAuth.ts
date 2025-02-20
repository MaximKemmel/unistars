import { useTypedSelector } from "./useTypedSelector";

export function useAuth() {
  const isAuth = useTypedSelector((state) => state.adminReducer.isAuth);
  const isRefreshed = useTypedSelector(
    (state) => state.adminReducer.isRefreshed,
  );

  return isAuth && isRefreshed;
}

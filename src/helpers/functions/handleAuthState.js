import {setAuthState} from "@/lib/redux/slices/authSlice";

export default async function handleAuthState(
      dispatch,
      isLoggedIn,
      role,
      id,
      emailConfirmed,
) {
    await dispatch(setAuthState({isLoggedIn, role, id, emailConfirmed}));
}

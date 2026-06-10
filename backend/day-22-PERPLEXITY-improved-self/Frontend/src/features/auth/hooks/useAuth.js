import { useDispatch } from "react-redux";
import { register, login, getMe, logout } from "../services/auth.api.js";
import { setUser, setLoading, setError } from "../auth.slice.js";

export function useAuth() {
  const dispatch = useDispatch();

  async function handleRegister({ email, username, password }) {
    try {
      dispatch(setLoading(true));
      const data = await register({ email, username, password });
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message ||
            error.message ||
            "Registration failed",
        ),
      );
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleLogin({ email, password }) {
    try {
      dispatch(setLoading(true));
      const data = await login({ email, password });
      dispatch(setUser(data.data.user));
      return true;
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message ||
            error.message ||
            "Login process failed",
        ),
      );
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleLogOut() {
    try {
      dispatch(setLoading(true));
      await logout();
      dispatch(setUser(null));
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to log out user",
        ),
      );
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleGetMe() {
    try {
      dispatch(setLoading(true));
      const data = await getMe();
      dispatch(setUser(data.data));
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to fetch user data",
        ),
      );
    } finally {
      dispatch(setLoading(false));
    }
  }

  return {
    handleRegister,
    handleLogin,
    handleGetMe,
    handleLogOut,
  };
}

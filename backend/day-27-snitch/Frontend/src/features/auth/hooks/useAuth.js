import { setError, setUser, setLoading } from "../state/auth.slice.js";
import { login, register } from "../services/auth.api.js";
import { useDispatch, useSelector } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  async function handleRegister({
    email,
    contact,
    password,
    fullname,
    isSeller = false,
  }) {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      const data = await register({
        email,
        contact,
        password,
        fullname,
        isSeller,
      });

      console.log(data.data.user);
      dispatch(setUser(data.data.user));
      return data.data.user;
    } catch (err) {
      const errorsArray = err.response?.data?.errors;
      let errMsg = err.response?.data?.message;

      if (
        !errMsg &&
        errorsArray &&
        Array.isArray(errorsArray) &&
        errorsArray.length > 0
      ) {
        errMsg = errorsArray.map((e) => e.msg).join(", ");
      }

      errMsg = errMsg || err.message || "Registration failed";
      dispatch(setError(errMsg));
      throw new Error(errMsg);
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleLogin({ email, password }) {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      const data = await login({ email, password });

      console.log(data.data.user);
      dispatch(setUser(data.data.user));
      return data.data.user;
    } catch (err) {
      const errorsArray = err.response?.data?.errors;
      let errMsg = err.response?.data?.message;

      if (
        !errMsg &&
        errorsArray &&
        Array.isArray(errorsArray) &&
        errorsArray.length > 0
      ) {
        errMsg = errorsArray.map((e) => e.msg).join(",");
      }

      errMsg = errMsg || err.message || "Login Failed";
      dispatch(setError(errMsg));
      throw new Error(errMsg);
    } finally {
      dispatch(setLoading(false));
    }
  }

  return { handleRegister, handleLogin, loading, error };
};

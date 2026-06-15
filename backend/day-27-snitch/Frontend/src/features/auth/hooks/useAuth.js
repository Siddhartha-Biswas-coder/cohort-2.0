import { setError, setUser, setLoading } from "../state/auth.slice.js";
import { register } from "../services/auth.services.js";
import { useDispatch } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch();

  async function handleRegister({
    email,
    contact,
    password,
    fullname,
    isSeller = false,
  }) {
    const data = await register({ email, contact, password, fullname ,isSeller });

    console.log(data.data.user);

    dispatch(setUser(data.data.user));
  }

  return { handleRegister };
};

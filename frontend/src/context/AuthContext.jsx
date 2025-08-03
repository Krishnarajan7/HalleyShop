import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "./CartContext";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [justLoggedOut, setJustLoggedOut] = useState(false);
  const { mergeCartAfterLogin, clearCart } = useCart();

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    console.log("AuthContext: Token on mount:", token || "No token"); // Debug
    if (token) {
      axios
        .get("http://localhost:5000/api/auth/me", { withCredentials: true })
        .then((res) => {
          console.log("AuthContext: Auth/me response:", res.data); // Debug
          setUser(res.data.user);
          setIsAdmin(res.data.user.role === "admin");
        })
        .catch((err) => {
          console.error(
            "AuthContext: Auth/me error:",
            err.response?.data || err.message
          ); // Debug
          document.cookie = "token=; Max-Age=0; path=/; SameSite=Lax";
          setUser(null);
          setIsAdmin(false);
        })
        .finally(() => setLoading(false));
    } else {
      console.log("AuthContext: No token found"); // Debug
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          console.warn("AuthContext: 401 detected, logging out...");
          document.cookie = "token=; Max-Age=0; path=/; SameSite=Lax";
          setUser(null);
          setIsAdmin(false);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  const login = async (email, password) => {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      { email, password },
      { withCredentials: true }
    );
    console.log("AuthContext: Login response:", res.data);

    setUser(res.data.user);
    setIsAdmin(res.data.user.role === "admin");

    // Merge guest cart into user cart
    if (mergeCartAfterLogin) {
      await mergeCartAfterLogin();
    }

    return res.data;
  };

  const register = async (
    firstName,
    lastName,
    email,
    password,
    role = "customer"
  ) => {
    const res = await axios.post(
      "http://localhost:5000/api/auth/register",
      { firstName, lastName, email, password, role },
      { withCredentials: true }
    );
    console.log("AuthContext: Register response:", res.data); // Debug
    setUser(res.data.user);
    setIsAdmin(res.data.user.role === "admin");
    return res.data;
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      console.log("AuthContext: Logout successful");
      document.cookie = "token=; Max-Age=0; path=/; SameSite=Lax";
      setUser(null);
      setIsAdmin(false);
      setJustLoggedOut(true);

      clearCart(false); 
    } catch (err) {
      console.error(
        "AuthContext: Logout error:",
        err.response?.data || err.message
      );
      throw err;
    }
  };

  const updateUser = async (data) => {
    try {
      const res = await axios.patch("http://localhost:5000/api/auth/me", data, {
        withCredentials: true,
      });
      console.log("AuthContext: Update user response:", res.data);
      setUser(res.data.user);
      setIsAdmin(res.data.user.role === "admin");
      return res.data;
    } catch (err) {
      console.error(
        "AuthContext: Update user error:",
        err.response?.data || err.message
      );
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        loading,
        login,
        register,
        logout,
        updateUser,
        justLoggedOut,
        setJustLoggedOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

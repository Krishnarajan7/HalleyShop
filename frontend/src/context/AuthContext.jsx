import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [justLoggedOut, setJustLoggedOut] = useState(false);

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
          console.error("AuthContext: Auth/me error:", err.response?.data || err.message); // Debug
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

  const login = async (email, password) => {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      { email, password },
      { withCredentials: true }
    );
    console.log("AuthContext: Login response:", res.data); // Debug
    setUser(res.data.user);
    setIsAdmin(res.data.user.role === "admin");
    return res.data;
  };

  const register = async (firstName, lastName, email, password, role = "customer") => {
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
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
      console.log("AuthContext: Logout successful"); // Debug
      document.cookie = "token=; Max-Age=0; path=/; SameSite=Lax";
      setUser(null);
      setIsAdmin(false);
      setJustLoggedOut(true);
    } catch (err) {
      console.error("AuthContext: Logout error:", err.response?.data || err.message); // Debug
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
        justLoggedOut,
        setJustLoggedOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
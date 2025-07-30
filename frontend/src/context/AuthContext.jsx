import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];
    if (token) {
      axios
        .get("http://localhost:5000/api/auth/me", { withCredentials: true })
        .then((res) => {
          setUser(res.data.user);
          setIsAdmin(res.data.user.role === "admin");
        })
        .catch((err) => {
          document.cookie = "token=; Max-Age=0";
          setUser(null);
          setIsAdmin(false);
          // Optionally redirect to login here if desired
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      { email, password },
      { withCredentials: true }
    );
    setUser(res.data.user);
    setIsAdmin(res.data.user.role === "admin");
    return res.data; // Return the response data
  };

  const register = async (firstName, lastName, email, password, role = "customer") => {
    const res = await axios.post(
      "http://localhost:5000/api/auth/register",
      { firstName, lastName, email, password, role },
      { withCredentials: true }
    );
    setUser(res.data.user);
    setIsAdmin(res.data.user.role === "admin");
    return res.data; // Return the response data
  };

  const logout = async () => {
    await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

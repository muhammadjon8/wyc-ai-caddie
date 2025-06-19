import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext({
  name: "",
  register: (username: string, userToken: string, livekitUrl: string) => {},
  logout: () => {},
  userToken: "",
  livekitUrl: "",
});

export const UserProvider = ({ children }) => {
  const [name, setName] = useState(() => localStorage.getItem("name") || "");
  const [userToken, setUserToken] = useState(
    () => localStorage.getItem("userToken") || ""
  );
  const [livekitUrl, setLivekitUrl] = useState(
    () => localStorage.getItem("livekitUrl") || ""
  );

  useEffect(() => {
    if (name) {
      localStorage.setItem("name", name);
    }
  }, [name]);

  const register = (
    username: string,
    userToken: string,
    livekitUrl: string
  ) => {
    setName(username);
    setUserToken(userToken);
    setLivekitUrl(livekitUrl);
  };
  const logout = () => {
    setName("");
    setUserToken("");
    localStorage.removeItem("name");
    localStorage.removeItem("userToken");
  };

  return (
    <UserContext.Provider
      value={{ name, register, logout, userToken, livekitUrl }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

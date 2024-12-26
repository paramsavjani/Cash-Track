import React from "react";
import UserContext from "./UserContext.js";

const UserContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [accessToken, setAccessToken] = React.useState(null);
  const [refreshToken, setRefreshToken] = React.useState(null);
  const [incomingRequests, setIncomingRequests] = React.useState([]);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        incomingRequests,
        setIncomingRequests,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

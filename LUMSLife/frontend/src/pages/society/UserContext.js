import { createContext } from "react";

const UserContext = createContext({
  accountID: null,
  setAccountID: () => {},
  accountType: null,
  setAccountType: () => {},
});

export default UserContext;

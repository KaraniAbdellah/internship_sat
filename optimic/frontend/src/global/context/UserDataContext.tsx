import { createContext, type Dispatch, type SetStateAction } from "react";
import { UserDataType } from "../types/UserDataType";

type UserDataContextValue = {
  user_data: UserDataType[];
  setUserData: Dispatch<SetStateAction<UserDataType[]>>;
};

const UserDataContext = createContext<UserDataContextValue | null>(null);
export default UserDataContext;
import { createContext, type Dispatch, type SetStateAction } from "react";
import { CustomerDataType } from "../types/CustomerDataType";

export type CustomerDataContextValue = {
  customerData: CustomerDataType[] | null;
  setCustomerData: Dispatch<SetStateAction<CustomerDataType[] | null>>;
};
export const CustomerDataContext = createContext<CustomerDataContextValue | null>(null);



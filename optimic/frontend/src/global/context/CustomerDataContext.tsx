import { createContext, type Dispatch, type SetStateAction } from "react";
import { CustomerDataType } from "../types/CustomerDataType";

export type CustomerDataContextValue = {
  customerData: CustomerDataType[] | null;
  setCustomerData: Dispatch<SetStateAction<CustomerDataType[]>>;
};

export const CustomerDataContext = createContext<CustomerDataContextValue | null>(null);
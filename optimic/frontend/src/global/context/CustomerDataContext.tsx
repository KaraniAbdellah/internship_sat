// src/global/context/CustomerDataContext.ts
import { createContext, type Dispatch, type SetStateAction } from "react";
import { CustomerDataType } from "../types/CustomerDataType";

export type CustomerDataContextValue = {
  customerData: CustomerDataType[];
  setCustomerData: Dispatch<SetStateAction<CustomerDataType[]>>;
};

export const CustomerDataContext = createContext<CustomerDataContextValue | null>(null);
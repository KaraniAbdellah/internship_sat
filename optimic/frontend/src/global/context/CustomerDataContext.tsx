import { CustomerDataType } from "../types/CustomerDataType";
import { createContext, type Dispatch, type SetStateAction } from "react";

type CustomerDataContextValue = {
  customerData: CustomerDataType | null;
  setCustomerData: Dispatch<SetStateAction<CustomerDataType | null>>;
};
const CustomerDataContext = createContext<CustomerDataContextValue | null>(null);
export { CustomerDataContext, type CustomerDataContextValue };

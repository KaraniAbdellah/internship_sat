import { createContext, type Dispatch, type SetStateAction } from "react";
import { OfferResultType } from "../types/OfferResultType";

export type OfferResultContextValue = {
  offreResult: OfferResultType[];
  setOffreResult: Dispatch<SetStateAction<OfferResultType[]>>;
  isGenerated: boolean;
  setIsGenerated: Dispatch<SetStateAction<boolean>>;
};

export const OfferResultContext = createContext<OfferResultContextValue | null>(null);
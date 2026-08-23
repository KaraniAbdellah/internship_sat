export type ValidationResult = {
  validation: boolean;
  description: string;
};

export type OfferResultType = {
  offre_rules?: string;
  customer_data?: string;
  score?: string;
  offre?: string;
  validation_feedback?: ValidationResult;
  optimized_offre?: string;
};

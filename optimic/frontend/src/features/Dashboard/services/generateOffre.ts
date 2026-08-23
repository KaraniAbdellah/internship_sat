const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export type GenerateOfferPayload = {
  customer_data: string;
  policies: string;
};

export async function generateOffre(data: GenerateOfferPayload) {
  try {
    const response = await fetch(`${API_URL}/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // Map HTTP status codes to natural, friendly messages
      if (response.status === 422) {
        throw new Error("Some of the audience data or policy rules look incomplete. Please review them and try again.");
      }
      if (response.status === 503 || response.status === 504) {
        throw new Error("The AI service is taking a moment to respond. Please give it a few seconds and try again.");
      }
      if (response.status >= 500) {
        throw new Error("We ran into a hiccup while crafting your offer. Please try again shortly.");
      }

      // Try reading backend error message if available
      try {
        const errorData = await response.json();
        if (typeof errorData?.detail === "string") {
          throw new Error(errorData.detail);
        }
      } catch {
        // Fallback if response isn't JSON
      }

      throw new Error("We couldn't generate your offer right now. Please try again.");
    }

    const result = await response.json();
    if (!result || typeof result !== "object") {
      throw new Error("The response came back empty. Please try generating again.");
    }

    return result;
  } catch (error: any) {
    // Friendly network failure message
    if (error instanceof TypeError && error.message.toLowerCase().includes("fetch")) {
      throw new Error("Unable to connect right now. Please check your connection and try again.");
    }
    throw error;
  }
}

export async function sendOffre(data: GenerateOfferPayload) {  
  
}
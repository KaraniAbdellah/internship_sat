const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// 1. Authenticate & receive HTTP-only cookie
export const authenticateUser = async (email: string, name: string) => {
  const response = await fetch(`${API_URL}/authenticate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Required to receive and store cookie
    body: JSON.stringify({ email, name }),
  });

  if (!response.ok) {
    throw new Error("Authentication failed");
  }

  return await response.json();
};

// 2. Example call to protected endpoint (Cookie will automatically be sent)
export const askQuestion = async (question: string, datasetId: string) => {
  const response = await fetch(`${API_URL}/ask-question`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Required to send auth_token cookie
    body: JSON.stringify({ question, dataset_id: datasetId }),
  });

  if (!response.ok) {
    throw new Error("Unauthorized or request failed");
  }

  return await response.json();
};
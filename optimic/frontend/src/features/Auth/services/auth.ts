const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const authenticateUser = async (email: string, name: string) => {
  try {
    const response = await fetch(`${API_URL}/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name }),
    });

    if (!response.ok) {
      throw new Error("Authentication failed");
    }

    const data = await response.json();
    return data; // Return the user data or token received from the backend
  } catch (error) {
    console.error("Error during authentication:", error);
    throw error;
  }
};

export { authenticateUser };

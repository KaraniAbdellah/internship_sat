const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default async function logout(): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Required to communicate cookie deletion
    });

    if (!response.ok) {
      throw new Error("Logout request failed on backend");
    }
  } catch (error) {
    console.error("Error during logout:", error);
  } finally {
    // Clear any local cache/storage
    localStorage.clear();
    sessionStorage.clear();

    // Redirect to login page
    window.location.href = "/";
  }
}
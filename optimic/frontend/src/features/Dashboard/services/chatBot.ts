const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"; // Replace with your backend API base URL
async function startChatWithDataset(
  rows: string[][],
  id: string,
  name: string,
  isActive: boolean,
  user_uid: string,
) {
  console.log("type of sending data:", typeof JSON.stringify({ rows }));
  try {
    console.log("Sending data to backend:", { rows, id, name, user_uid });
    const response = await fetch(`${API_BASE_URL}/upload-dataset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Required to send auth_token cookie
      body: JSON.stringify({
        rows: rows,
        dataset_id: id,
        dataset_name: name,
        isActive: isActive,
        user_uid: user_uid,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to start chat with the dataset");
    }

    const data = await response.json();
    console.log("Chat started successfully:", data);
  } catch (error) {
    console.error("Error starting chat with the dataset:", error);
  }
}

async function askQuestion(question: string) {
  try {
    const response = await fetch("/ask-question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });
    const data = await response.json();
    console.log("Question asked successfully:", data);
  } catch (error) {
    console.error("Error asking question:", error);
  }
}

export { startChatWithDataset, askQuestion };

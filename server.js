// server.js

// --- Imports ---
// These are the libraries our server needs to function.
import express from "express";      // The web server framework
import fetch from "node-fetch";   // To make requests to other APIs (like Gemini's)
import dotenv from "dotenv";      // To load secret keys from a .env file
import cors from "cors";          // To allow our frontend to talk to this backend

// --- Initialization ---

// Load environment variables from the .env file into process.env
dotenv.config();

// Create an instance of the Express application
const app = express();

// --- Middleware ---
// Middleware runs on every request that comes into the server.

// 1. Enable CORS (Cross-Origin Resource Sharing)
// This is critical for allowing your deployed website to make requests to this server.
app.use(cors());

// 2. Enable the server to understand JSON-formatted request bodies.
// This is needed for our frontend to send chat messages to the /api/ai endpoint.
app.use(express.json());


// --- Routes ---
// These are the different endpoints our server will respond to.

// A simple "health check" route to confirm the server is running.
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// The main AI proxy route.
app.post("/api/ai", async (req, res) => {
  console.log("✅ Received request at /api/ai");

  // Securely read the API key from the environment variables.
  const apiKey = process.env.GEMINI_API_KEY;

  // First, check if the API key is even available.
  if (!apiKey) {
    console.error("❌ GEMINI_API_KEY is not set in the environment. Make sure you have a .env file.");
    return res.status(500).json({ error: "Server configuration error: Missing API Key." });
  }

  try {
    // Convert messages to Gemini format
    const { messages } = req.body;
    
    // Combine all messages into a single prompt for Gemini
    const prompt = messages.map(msg => {
      if (msg.role === 'system') return msg.content;
      if (msg.role === 'user') return `User: ${msg.content}`;
      if (msg.role === 'assistant') return `Assistant: ${msg.content}`;
      return msg.content;
    }).join('\n\n');

    // Forward the request to the official Gemini API endpoint.
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 1,
          topP: 1,
          maxOutputTokens: 1024,
        }
      }),
    });

    // If Gemini's API returns an error...
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({})); // Try to get detailed error message
      console.error("❌ Gemini API returned an error:", response.status, errorData);
      return res.status(response.status).json({ error: errorData.error || `Gemini API Error: ${response.statusText}` });
    }

    // If successful, send the response from Gemini back to our frontend.
    const data = await response.json();
    res.json(data);

  } catch (err) {
    // If the fetch call itself fails (e.g., due to a network error or invalid API key)...
    console.error("❌ Fatal error when trying to contact Gemini API. This is likely a network issue or an invalid API key.");
    console.error("Detailed error:", err); // This detailed log is for debugging.
    res.status(500).json({ error: "Failed to contact Gemini API. Check the server terminal for more details." });
  }
});


// --- Server Start ---
const PORT = process.env.PORT || 3001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Backend server running on http://0.0.0.0:${PORT}`);
});
// server.js - Express server to host the web interface and API
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
const { GoogleAIFileManager } = require("@google/generative-ai/server");

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Gemini API
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const fileManager = new GoogleAIFileManager(apiKey);

// Global variable to store chat session
let globalChatSession = null;

/**
 * Uploads the given file to Gemini.
 */
async function uploadToGemini(path, mimeType) {
  const uploadResult = await fileManager.uploadFile(path, {
    mimeType,
    displayName: path,
  });
  const file = uploadResult.file;
  console.log(`Uploaded file ${file.displayName} as: ${file.name}`);
  return file;
}

/**
 * Waits for the given files to be active.
 */
async function waitForFilesActive(files) {
  console.log("Waiting for file processing...");
  for (const name of files.map((file) => file.name)) {
    let file = await fileManager.getFile(name);
    while (file.state === "PROCESSING") {
      process.stdout.write(".")
      await new Promise((resolve) => setTimeout(resolve, 10_000));
      file = await fileManager.getFile(name)
    }
    if (file.state !== "ACTIVE") {
      throw Error(`File ${file.name} failed to process`);
    }
  }
  console.log("...all files ready\n");
}

/**
 * Initialize the chat session with document
 */
async function initializeChatSession() {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: "You are LankaPack Bot, your job is to answer questions based on the document containing information about lankapack, when a user initiates conversation, resond with \"Hi, I am LankaPack Chatbot, I am here to answer any questions you have about LankaPack or their products\" or something similar",
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };

    // Upload the file
    const files = [
      await uploadToGemini("CSCI323 chatbot info merged.pdf", "application/pdf"),
    ];

    // Wait for files to be ready
    await waitForFilesActive(files);

    // Create chat session with history
    globalChatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {
              fileData: {
                mimeType: files[0].mimeType,
                fileUri: files[0].uri,
              },
            },
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Okay, I understand. Ask me anything about LankaPack, and I'll do my best to answer based on the information in the document you provided.\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "Hi\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Hi, I am LankaPack Chatbot, I am here to answer any questions you have about LankaPack or their products\n"},
          ],
        },
      ],
    });

    console.log("Chat session initialized successfully");
    return true;
  } catch (error) {
    console.error("Error initializing chat session:", error);
    return false;
  }
}

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint to send message to chatbot
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!globalChatSession) {
      const initialized = await initializeChatSession();
      if (!initialized) {
        return res.status(500).json({ error: 'Failed to initialize chat session' });
      }
    }
    
    const result = await globalChatSession.sendMessage(message);
    const response = result.response.text();
    
    res.json({ response });
  } catch (error) {
    console.error('Error processing message:', error);
    res.status(500).json({ error: 'Error processing message' });
  }
});

// Initialize the server
(async () => {
  try {
    // Initialize chat session on server start
    await initializeChatSession();
    
    // Start the server
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Server initialization error:', error);
  }
})();

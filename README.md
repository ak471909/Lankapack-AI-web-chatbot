# Lankapack-AI-web-chatbot

LankaPack Chatbot - Google AI Cloud Studio
Google AI Studio is a tool for building, testing, and deploying AI-powered chatbots and assistants. It allows:
- Creating AI-powered chatbots using Gemini models.
- Customizing responses and function calling (API integrations).


# Step 1: Setting Up the LankaPack chatbot using Google AI Studio Chatbot
1. Go to Google AI Studio

Open Google AI Studio and sign in with your Google account.

2. Create a New Chatbot
   
Click "Create a new assistant" and give it a name - LankaPack AI Assistant

3. Train the Chatbot with a Document
   
The chatbot was trained on the document containing information about the company and their products

4. Customize the Chatbot’s Behavior
Set up an introduction message:
 "Hi, I am LankaPack Chatbot! Ask me anything about LankaPack or our products."

## Prompt engineering image

The "LankaPack Bot" description acts as a system prompt — it sets clear boundaries and goals for how the chatbot should behave, respond, and interact with users.

Setting the temperature to modify the amount of creativity allowed in the response 
## temperature image

Modifying the safety settings to block unwanted content
## safety settings image 

Setting the right safety settings is important for allowing the chatbot to give brief solutions without having to cut out important information
## top p image

The probability threshold in Top-p sampling (also known as nucleus sampling) controls how the model selects the next token (word) during text generation.
sampling image 

## Deployment on web-app

1. Generate the Embed Code


   - In Google AI Studio, go to the "Get code" section.
   - Select "Embed on a website."
   - Copy the generated HTML/JavaScript code.

2. Create the website as required and deploy using the code
# files image 

File descriptions
The main web files for the chatbot are the index.html, script.js, and styles.css files and stored within the public folder

1. Index.html
   
This file sets up a basic website layout with an integrated chatbot widget. It combines structure (HTML), styling (CSS), and functionality (JavaScript). The chatbot is pre-configured with a welcome message and allows users to send text input, though the actual chatbot behavior relies on the script. The design supports responsiveness and includes Font Awesome icons for a more modern, interactive look.

2. styles.css
This CSS file enhances the chatbot's appearance, ensures smooth animations, and maintains responsiveness across different screen sizes.
The style of the chatbot is meant to match the theme and appearance of the main lankapack website so it would fit in easily


3. script.js
   
This script manages a chatbot widget, handling UI interactions and server communication. It enables toggling the chat window, sending user messages, displaying bot responses, and showing a typing indicator while waiting for a reply. It also supports sending messages via the "Enter" key and includes a notification badge for unread messages when the chat is closed. The bot communicates with a server endpoint (/api/chat) to process responses and updates the chat dynamically.

4. .env
   
This file holds the API key from google AI studio to access the chatbot from the website and the port number that the localhost is hosted on

5. package-lock.json
   
This package-lock.json file defines the dependencies for your lankapack-chatbot project. Key points:
Project Name & Version: It's labeled as lankapack-chatbot version 1.0.0.
Main Dependencies: It includes packages like @google/generative-ai (v0.24.0) — likely for AI capabilities — and express (v4.21.2) for handling the backend server.
Development Tools: Includes nodemon (v3.1.9) for live server reloads and dotenv (v16.4.7) for managing environment variables.
Node Compatibility: Most packages require Node >=18.0.0, ensuring compatibility with modern Node versions.

6. package-json
    
This setup defines a Node.js project for a LankaPack chatbot using the Gemini API. It uses express for handling server routes, body-parser for parsing incoming JSON data, cors for handling cross-origin requests, and dotenv for managing environment variables. Development is streamlined with nodemon for automatic server restarts. The chatbot logic will likely live in server.js, interacting with the Gemini API via the @google/generative-ai package.

7. server.js
    
This script sets up an Express server for the LankaPack chatbot, integrating Google's Gemini API. It handles file uploads (PDFs) for context, initializes a persistent chat session, and provides routes for serving a frontend and API endpoint (/api/chat) to handle user messages. The chatbot responds based on the provided document, ensuring personalized, LankaPack-specific replies. CORS and body parsing are configured for smooth API communication, and the server auto-initializes the chat session on startup.



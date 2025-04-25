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



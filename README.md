# Chatbot Web Application

Welcome to the Chatbot Web Application! This project is a simple yet effective chatbot built using Next.js, TypeScript, Shadcn UI, and Tailwind CSS. The chatbot allows users to interact by sending messages and asking questions. It responds with predefined responses based on the user's queries. Additionally, it displays a loading indicator while fetching the response and provides feedback if the query is not found in the mock data. The user can also save chat sessions and continue them later. I have used Next Context API to manage the chat state and user actions and localStorage to save chat sessions. I have used Next.js API routing to set up a mock API to fetch responses for the chatbot.

You can checkout the mock data used in the chatbot here - `/src/lib/chatbotConfig/sampleData.ts`

The project is live at - https://chatbot-assignment-jainsaman.vercel.app/

## Features

- Simple Interface: User-friendly chat interface for seamless interaction.
- Mock API Integration: Demonstrates the process of fetching responses using a mock API set up with Next.js API routing.
- Loading Indicator: Provides visual feedback to users during response fetching.
- Error Handling: Displays an appropriate message if the user's query is not found in the mock data.
- Save Chat Sessions: Allows users to save chat sessions and continue them later.

## Installation

To run the Chatbot Web Application locally, follow these steps:

1. Clone the repository using the following command:

```bash
git clone https://github.com/jainsaman/chatbot-assignment.git
```

2. Navigate to the project directory:

```bash
cd chatbot-assignment
```

3. Install the dependencies:

```bash
npm install
# or
yarn install
```

## Running the Application Locally

After installing dependencies, you can run the application locally:

```bash
npm run dev
# or
yarn dev
```

This command starts the development server. Open http://localhost:3000 in your browser to view the application.

## Usage

Once the application is running, you can interact with the chatbot:

- Type your query or message in the chat input field.
- Click on the send button to send your message.
- The chatbot will respond with a predefined response based on your query.
- If your query is not found in the mock data, the chatbot will display an appropriate message.
- You can also observe the loading indicator while the chatbot fetches the response.
- You can save the chat session and load it back again later.

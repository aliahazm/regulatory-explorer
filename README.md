# Overview

This project is an AI-Enhanced Regulatory Document Explorer Chanllenge from Otonoco AI. The aim was to showcase my approach to problem-solving, architecture decisions, and implementation skills within a limited timeframe.

## Approach and Architecture Decisions

I adopted a MVC architecture to keep the app simple and organized. I used React because of its reusability and flexibility and I structured the codebase with components to ensure modularity and maintainability.

## Features Implemented

1. Basic regulatory interface to fetch regulatory data from FDA API as a sample, display document list with basic information, a simple detail view for selected documents and basic responsive design.
2. AI document analysis feature was chosen because the most important thing we want to know from a regulatory document are what we need to do and what to avoid to comply. Hence why AI-generated compliance summaries and key points are being prioritized in this project.

## Challenge

The biggest challenge is in integrating the AI as it is my first time to work with AI. Ollama was chosen just for the sake of this project to use the AI locally and because it is free. For a real project, I would use OpenAI because it is cloud-based and has the best performance as it is continually optimized for reasoning, coding, creative writing, and data analysis which is great for regulatory document analysis. There were many errors encountered such as error in fetching the API but I managed to solve them by researching and keep try and error.

## Areas for Improvement

There are many areas that can be improved with more time. For example, I would add more features such as compliance risk scoring, regulatory change tracking, user authentication and better design. In addition, I would enhance the state management for performance optimization.


## Instructions to run the app

1. Make sure the following are installed on your machine:
  - Node.js
  - Ollama
2. Install dependencies "npm install" and run ollama "ollama run llama2". Ollama will start a local server, usually on http://localhost:11434.
3. Start the app "npm run dev".


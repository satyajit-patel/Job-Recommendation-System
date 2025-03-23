## JobsForce.ai - Job Recommendation System

A microservice-based backend application that provides job recommendations based on resume analysis using Natural Language Processing.

# find the live link [here](coming soon)

## Project Overview

This backend system allows users to:
1. Register and log in with JWT authentication
2. Upload their resume (PDF)
3. Get skill extraction from their resume using Groq Mixtral model via LangChain
4. Receive job recommendations based on skill matching

## Architecture

This application follows a microservice architecture with the following components:

- **Authentication Service**: Handles user registration and login
- **Resume Processing Service**: Processes uploaded resumes and extracts skills
- **Job Recommendation Service**: Matches user skills with job listings
- **Job Scraping Service**: Collects job data from online sources

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **File Storage**: Local storage (in a production environment, use AWS S3)
- **Authentication**: JWT-based
- **ML/NLP**: LangChain.js with Groq Mixtral model
- **Job Scraping**: Firecrawl

## API Endpoints

The system provides three main API endpoints:

1. **POST /api/v1/user/register**
   - Register a new user
   - Request body: `{ "username": "user", "email": "user@example.com", "password": "password" }`
   - Response: User object and JWT token

2. **POST /api/v1/user/login**
   - Log in an existing user
   - Request body: `{ "email": "user@example.com", "password": "password" }`
   - Response: User object and JWT token

3. **POST /api/v1/data/resume**
   - Upload resume and get job recommendations
   - Headers: Authorization: Bearer {token}
   - Response: Extracted skills and job recommendations

## Setup Instructions

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file and add your configurations
4. Start the server:
   ```
   node server.js
   ```

## Required Environment Variables
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `FIRECRAWL_API_KEY`: Secret key for Firecrawl
- `GROQ_API_KEY`: API key for Groq (Mixtral model)

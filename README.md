## CivicClean Backend (Express + MongoDB)

This is the server-side REST API for the **CivicClean** platform. It handles secure data operations, user verification, and communication with the MongoDB database.

## API Features & Architecture

- **Token-Based Authentication:**  
  All sensitive routes are protected by a `verifyToken` middleware. Tokens are verified using **firebase-admin**, and only the authenticated user can access or modify their own data.

- **Full CRUD Endpoints:**  
  REST API for managing **issues** and **contributions** (Create, Read, Update, Delete) using MongoDB.

- **Optimized Queries:**  
  Endpoints like `/issues/recent` and `/my-contributions` return filtered and sorted results for better performance.

- **Server-Controlled Timestamps:**  
  The server generates and updates all `date` fields to ensure consistent and accurate sorting.

- **Secure Deployment Setup:**  
  Environment variables are used for all credentials, with Firebase keys and database URLs.

---

## Tech Stack

- **Node js** - Server runtime
- **Express js** - RESTful API framework
- **MongoDB / MongoDB Atlas** - Database and cloud storage
- **Firebase Admin SDK** - Secure token verification & authorization
- **CORS** - Cross-origin request handling
- **dotenv** - Environment variable management
- **Vercel** - Hosting for serverless backend API

# CivicClean Backend – Express + MongoDB API

The server-side REST API for the CivicClean platform. Handles secure data operations, user verification, and communication with MongoDB database.

**Live API:** [Deployed on Vercel](https://civic-clean-server.vercel.app/)

---

## Main Features

### Security & Authentication

- **Token-Based Authentication** - All sensitive routes protected by `verifyToken` middleware
- **Firebase Admin Verification** - Secure token validation for user operations
- **User Data Protection** - Users can only access and modify their own data

### API Functionality

- **Full CRUD Operations** - Complete REST API for issues and contributions
- **Optimized Queries** - Filtered and sorted endpoints (`/issues/recent`, `/my-contributions`)
- **Server-Controlled Timestamps** - Consistent date generation for reliable sorting
- **Error Handling** - Comprehensive error responses and validation

### Deployment

- **Environment-Based Configuration** - Secure credential management with dotenv
- **Serverless Architecture** - Hosted on Vercel for scalability
- **CORS Enabled** - Cross-origin resource sharing for frontend integration

---

## Technology Stack

- **Node.js** - Server runtime environment
- **Express.js** - RESTful API framework
- **MongoDB / MongoDB Atlas** - NoSQL database and cloud storage
- **Firebase Admin SDK** - Token verification and authorization
- **CORS** - Cross-origin request handling
- **dotenv** - Environment variable management
- **Vercel** - Serverless deployment platform

---

## Dependencies

### Production Dependencies

```json
{
  "cors": "^2.8.5",
  "dotenv": "^17.2.3",
  "express": "^5.1.0",
  "firebase-admin": "^13.6.0",
  "mongodb": "^7.0.0"
}
```

---

## Running Locally

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB installation
- Firebase project with Admin SDK service account

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/rahmanshaon/A10-civic-clean-server
   cd A10-civic-clean-server
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory:

   ```env
   PORT=5000
   DB_USER=your_mongodb_username
   DB_PASS=your_mongodb_password
   FIREBASE_SERVICE_KEY=your_base64_encoded_service_account_key
   ```

   **Note:** `FIREBASE_SERVICE_KEY` should contain the base64-encoded Firebase Admin SDK service account JSON.

   To encode your service account key:

   ```bash
   node -e "console.log(Buffer.from(require('fs').readFileSync('./serviceAccountKey.json', 'utf8')).toString('base64'))"
   ```

   Then in your server code, decode it:

   ```javascript
   const serviceAccount = JSON.parse(
     Buffer.from(process.env.FIREBASE_SERVICE_KEY, "base64").toString("utf8")
   );
   ```

4. **Start the server**

   ```bash
   npm start
   ```

5. **Server running** at `http://localhost:5000`

---

## API Endpoints

### Issues

- `GET /issues` - Get all issues with optional filtering
- `GET /issues/recent` - Get recent issues (sorted by date)
- `GET /issues/:id` - Get single issue by ID
- `POST /issues` - Create new issue (protected)
- `PUT /issues/:id` - Update issue (protected, owner only)
- `DELETE /issues/:id` - Delete issue (protected, owner only)

### Contributions

- `GET /contributions` - Get all contributions
- `GET /my-contributions` - Get authenticated user's contributions (protected)
- `POST /contributions` - Create new contribution (protected)

---

## Authentication Middleware

Protected routes require a valid Firebase ID token in the request headers:

```javascript
headers: {
  'Authorization': 'Bearer <firebase_id_token>'
}
```

The `verifyToken` middleware validates the token and attaches user information to the request object.

---

## Deployment

The API is deployed on Vercel as a serverless function. Environment variables are configured in the Vercel dashboard.

---

## Links

- **Live API:** [Vercel Deployment](https://civic-clean-server.vercel.app/)
- **Repository:** [GitHub](https://github.com/rahmanshaon/A10-civic-clean-server)
- **Frontend Repository:** [CivicClean Client](https://github.com/rahmanshaon/A10-civic-clean-client)
- **Documentation:** [Express](https://expressjs.com/) | [MongoDB](https://www.mongodb.com/docs/) | [Firebase Admin](https://firebase.google.com/docs/admin/setup)

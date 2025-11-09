const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

// Initialize the Express app
const app = express();
const port = process.env.PORT || 3000;

// --- Middlewares ---
app.use(cors());
app.use(express.json());

// --- MongoDB Connection ---
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pc7o2g1.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    const database = client.db("civicCleanDB");
    const issuesCollection = database.collection("issues");
    const contributionsCollection = database.collection("contributions");

    // --- API Endpoints ---

    // GET all issues
    app.get("/issues", async (req, res) => {
      const cursor = issuesCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // GET latest 6 issues for the home page
    app.get("/issues/recent", async (req, res) => {
      const cursor = issuesCollection.find().sort({ _id: -1 }).limit(6);
      const result = await cursor.toArray();
      res.send(result);
    });

    // GET a single issue by its ID
    app.get("/issues/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await issuesCollection.findOne(query);
      res.send(result);
    });

    // POST a new issue to the database
    app.post("/issues", async (req, res) => {
      const newIssue = req.body;
      console.log("Received new issue to save:", newIssue);
      const result = await issuesCollection.insertOne(newIssue);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

// --- Test Route ---
app.get("/", (req, res) => {
  res.send("Civic Clean Server is running!");
});

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});

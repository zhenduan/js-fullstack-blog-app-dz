import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";
const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
  console.log("Connected to MongoDB successfully!");
} catch (e) {
  console.error("Failed to connect to MongoDB:", e);
  process.exit(1); // Exit the process if the connection fails
}

// Ensure `conn` is defined before accessing `conn.db`
if (!conn) {
  console.error("MongoDB connection failed.");
  process.exit(1);
}

// Access the database
let db = conn.db("blog-app-database");
export default db;

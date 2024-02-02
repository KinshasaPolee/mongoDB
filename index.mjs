import express from "express";
import dotenv from "dotenv";
dotenv.config()
import mongoose from "mongoose";
import grades from "./routes/grades"

const ATLAS_uri = process.env.ATLAS_uri
const db = mongoose.connect;

db.on("error", (err) => console.log(err.message + " is mongod not running?"))
db.on("open", () => console.log("mongo connected: ", ATLAS_URI))
db.on("close", () => console.log("mongo disconnected"))


mongoose.connect(ATLAS_URI)
const PORT = 5050;
const app = express();

import grades from "./routes/grades.mjs";

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to the API.");
});

app.use("/grades", grades);

// Global error handling
app.use((err, _req, res, next) => {
    res.status(500).send("Seems like we messed up somewhere...");
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./db/db");
const cors = require("cors");

const userRoutes = require("./routes/user");

dotenv.config();

const PORT = process.env.PORT || 8001;

// Connect to MongoDB Atlas
connectDB();

// Middleware
app.use(cors());
app.use(express.json());


//routes
app.use("/api/users", userRoutes);


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
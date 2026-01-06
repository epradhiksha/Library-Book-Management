const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");

const bookRoutes = require("./routes/bookRoutes");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/books", bookRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const connectDB = require("./connnection");
const list = require("./routers/list");
dotenv.config();

app.use(express.json());
app.use(cors());
connectDB();

const PORT = process.env.PORT;

app.use("/api", list);

app.listen(PORT, () => {
  console.log(`Server is up on port: ${PORT}`);
});

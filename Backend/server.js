require("dotenv").config();
const dns = require("dns");
dns.setDefaultResultOrder("ipv4first"); // add this near your other requires
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const port = 2468;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => console.log("DB Connected"))
  .catch((err) => console.log(err.message));

const routes = require("./routes/mainRoutes");
app.use("/students", routes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${port}`);
});

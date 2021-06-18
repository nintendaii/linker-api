const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const bodyParser = require("body-parser");
const routes = require("./routes");
const cors = require("cors");

const app = express();
//cors({ origin: "http://localhost:8080" });
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);

const PORT = config.get("port") || process.env.PORT;

async function start() {
  try {
    await mongoose.connect(config.get("mongoURI"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    app.listen(PORT, () => console.log(`App is started on port ${PORT}`));
  } catch (error) {
    console.log("error" + error);
    process.exit(1);
  }
}

start();

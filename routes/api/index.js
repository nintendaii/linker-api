const express = require("express");
const path = require("path");

const userRouter = require("./user");
const categoryRouter = require("./category");
const bookmarkRouter = require("./bookmark");

const router = express.Router();

router.use("/user", userRouter);
router.use("/category", categoryRouter);
router.use("/bookmark", bookmarkRouter);

router.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../../home.html"));
});

module.exports = router;

const express = require("express");

const userRouter = require("./user");
const categoryRouter = require("./category");

const router = express.Router();

router.use("/user", userRouter);
router.use("/category", categoryRouter);

module.exports = router;

const express = require("express");

const userRouter = require("./user");
const categoryRouter = require("./category");
const bookmarkRouter = require("./bookmark");

const router = express.Router();

router.use("/user", userRouter);
router.use("/category", categoryRouter);
router.use("/bookmark", bookmarkRouter);

module.exports = router;

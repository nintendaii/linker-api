const { Router } = require("express");
const { verifyToken } = require("../../../midleware/verifyToken");
const router = Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const categoryController = require("../../../controllers/").categoryController;
require("../../../midleware/verifyToken");

router.post("/create", [verifyToken], async (req, res) => {
  try {
    const token = jwt.verify(req.token, config.get("jwtSecret"));
    const result = await categoryController.create.create(
      req.body,
      token.payload.id
    );
    res
      .status(result.status)
      .send({ message: result.message, data: result.data });
  } catch (error) {
    res.status(400).json({ message: "Something went wong (" + error });
  }
});

module.exports = router;

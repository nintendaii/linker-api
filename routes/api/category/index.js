const { Router } = require("express");
const { verifyToken } = require("../../../midleware/verifyToken");
const router = Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const categoryController = require("../../../controllers/").categoryController;
require("../../../midleware/verifyToken");

router.post("", [verifyToken], async (req, res) => {
  try {
    const payload = req.payload;
    console.log(payload);
    const result = await categoryController.create.create(req.body, payload.id);
    res
      .status(result.status)
      .send({ message: result.message, data: result.data });
  } catch (error) {
    res.status(400).json({ message: "Something went wong (" + error });
  }
});

router.delete("/:id", [verifyToken], async (req, res) => {
  try {
    const result = await categoryController.deleteCategory.deleteCategory(
      req.params.id
    );
    res.status(result.status).send({ message: result.message });
  } catch (error) {
    res.status(400).json({ message: "Something went wong (" + error });
  }
});

module.exports = router;

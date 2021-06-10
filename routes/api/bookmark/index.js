const { Router } = require("express");
const { verifyToken } = require("../../../midleware/verifyToken");
const router = Router();
const bookmarkController = require("../../../controllers/").bookmarkController;
require("../../../midleware/verifyToken");

router.post("/", [verifyToken], async (req, res) => {
  try {
    const result = await bookmarkController.create.create(req.body);
    res
      .status(result.status)
      .send({ message: result.message, data: result.data });
  } catch (error) {
    res.status(400).json({ message: "Something went wong (" + error });
  }
});

router.get("/", [verifyToken], async (req, res) => {
  try {
    const payload = req.payload;
    const result = await bookmarkController.get.get(payload.id);
    res.status(result.status).send({ data: result.data });
  } catch (error) {
    res.status(400).json({ message: "Something went wong (" + error });
  }
});

router.get("/:id", [verifyToken], async (req, res) => {
  try {
    const result = await bookmarkController.getOne.getOne(req.params.id);
    res.status(result.status).send({ data: result.data });
  } catch (error) {
    res.status(400).json({ message: "Something went wong (" + error });
  }
});

router.delete("/:id", [verifyToken], async (req, res) => {
  try {
    const result = await bookmarkController.deleteBookmark.deleteBookmark(
      req.params.id
    );
    res.status(result.status).send({ message: result.message });
  } catch (error) {
    res.status(400).json({ message: "Something went wong (" + error });
  }
});

router.put("/:id", [verifyToken], async (req, res) => {
  try {
    const result = await bookmarkController.edit.edit(
      req.params.id,
      req.body.title
    );
    res.status(result.status).send({ message: result.message });
  } catch (error) {
    res.status(400).json({ message: "Something went wong (" + error });
  }
});

module.exports = router;

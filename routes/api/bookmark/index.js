const { Router } = require("express");
const { verifyToken } = require("../../../midleware/verifyToken");
const router = Router();
const bookmarkController = require("../../../controllers/").bookmarkController;
require("../../../midleware/verifyToken");

router.post("/", [verifyToken], async (req, res) => {
  try {
    const payload = req.payload;
    const result = await bookmarkController.create.create(req.body, payload.id);
    res.status(result.status).send({ code: result.code, data: result.data });
  } catch (error) {
    res.status(400).json({ code: "Something went wong (" + error });
  }
});

router.get("/", [verifyToken], async (req, res) => {
  try {
    const payload = req.payload;
    const result = await bookmarkController.getAll.getAll(payload.id);
    res.status(result.status).send({ data: result.data });
  } catch (error) {
    res.status(400).json({ code: "Something went wong (" + error });
  }
});

router.get("/:id", [verifyToken], async (req, res) => {
  try {
    const result = await bookmarkController.getOne.getOne(req.params.id);
    res.status(result.status).send({ data: result.data });
  } catch (error) {
    res.status(400).json({ code: "Something went wong (" + error });
  }
});

router.delete("/:id", [verifyToken], async (req, res) => {
  try {
    const result = await bookmarkController.deleteBookmark.deleteBookmark(
      req.params.id
    );
    res.status(result.status).send({ code: result.code });
  } catch (error) {
    res.status(400).json({ code: "Something went wong (" + error });
  }
});

router.put("/:id", [verifyToken], async (req, res) => {
  try {
    const result = await bookmarkController.edit.edit(
      req.params.id,
      req.body.category
    );
    res.status(result.status).send({ code: result.code });
  } catch (error) {
    res.status(400).json({ code: "Something went wong (" + error });
  }
});

module.exports = router;

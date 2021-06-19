const { Router } = require("express");
const router = Router();
const { check, validationResult } = require("express-validator");
const { verifyToken } = require("../../../midleware/verifyToken");
const userController = require("../../../controllers").userController;

router.post(
  "/signup",
  [
    check("email", "invalid_email").isEmail(),
    check("password", "Invalid passwod (min 6 chars)").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let es = errors.array();
        if (es.length > 1) {
          return res.status(400).send({ code: "invalid_email_and_password" });
        } else if (es[0].msg == "invalid_email") {
          return res.status(400).send({ code: "invalid_email" });
        } else {
          return res.status(400).send({ code: "invalid_password" });
        }
      }
      let user = await userController.signup.signup(req.body);
      let { status, ...dataToSend } = user;
      res.status(user.status).send(dataToSend);
    } catch (error) {
      res.status(400).json({ message: "Something went wong (" + error });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "invalid_email").normalizeEmail().isEmail(),
    check("password", "invalid_password").exists(),
  ],
  async (req, res) => {
    try {
      console.log(req.body);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let es = errors.array();
        if (es.length > 1) {
          return res.status(400).send({ code: "invalid_email_and_password" });
        } else if (es[0].msg == "invalid_email") {
          return res.status(400).send({ code: "invalid_email" });
        } else {
          return res.status(400).send({ code: "invalid_password" });
        }
      }
      let userModel = await userController.login.login(req.body);
      let { status, ...dataToSend } = userModel;
      res.status(userModel.status).send(dataToSend);
    } catch (error) {
      res.status(500).send({ message: "Something went wrong :(" });
    }
  }
);

router.get("", [verifyToken], async (req, res) => {
  try {
    const payload = req.payload;
    let userModel = await userController.getMainData.getMainData(payload.id);
    res.status(userModel.status).send(userModel);
  } catch (error) {
    res.status(500).send({ message: "Something went wrong :(" });
  }
});

module.exports = router;

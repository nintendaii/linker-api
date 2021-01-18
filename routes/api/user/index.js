const {Router} = require('express')
const router = Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const {check,validationResult} = require('express-validator')
const User = require('../../../models/User')
const userController = require('../../../controllers').userController

router.post('/signup',
  [
    check('email', 'Invalid email').isEmail(),
    check('password', 'Invalid passwod (min 6 chars)').isLength({ min: 6 })
  ],
  async(req,res)=>{
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), message: 'Invalid data' });
      }
    let user = await userController.signup.signup(req.body);
    res.status(user.status).json(user)
  } catch (error) {
    res.status(400).json({message:"Something went wong ("+error})
  }
})

router.post(
  '/login',
  [
    check('email', 'Invalid email').normalizeEmail().isEmail(),
    check('password', 'Invalid passwod (min 6 chars)').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: 'Invalid data' });
      }
      let userModel = await userController.login.login(req.body)
      res.status(userModel.status).json(userModel)
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong :(' });
    }
  }
)

module.exports=router
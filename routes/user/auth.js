const {Router} = require('express')
const router = Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const {check,validationResult} = require('express-validator')
const User = require('../../models/User')

router.post('/signup',
  [
    check('email', 'Invalid email').isEmail(),
    check('password', 'Invalid passwod (min 6 chars)').isLength({ min: 6 })
  ],
  async(req,res)=>{
  try {
    console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), message: 'Invalid data' });
      }
    const {email,password}=req.body
    const candidate = await User.findOne({email})
    if (candidate) {
      return res.status(400).json({message:"User already exists"})
    }
    const hashedPassword = await bcrypt.hash(password,12)
    let user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User is created' });
  } catch (error) {
    res.status(500).json({message:"Something went wong ("})
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

      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User is not found' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Incorrect password' });
      }

      const token = jwt.sign(
        {userId:user.id},
        config.get('jwtSecret'),
        {expiresIn: '1h'}
      )

      res.json({token, userId: user.id})
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong :(' });
    }
  }
)

module.exports=router